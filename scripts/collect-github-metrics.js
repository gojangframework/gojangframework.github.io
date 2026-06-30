#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SCHEMA_VERSION = 1;
const DEFAULT_OWNER = 'gojangframework';
const DEFAULT_REPO = 'gojang';
const DEFAULT_OUTPUT = path.join('src', 'data', 'gojangRepoMetrics.json');
const WINDOWS = [
  ['7d', 7],
  ['30d', 30],
  ['90d', 90],
  ['365d', 365],
  ['all', null],
];

function isoNow() {
  return new Date().toISOString();
}

function dateOnly(value) {
  if (!value) {
    return null;
  }
  return new Date(value).toISOString().slice(0, 10);
}

function emptyMetric() {
  return {count: 0, uniques: 0};
}

function normalizeDay(day) {
  return {
    date: day.date,
    views: {
      count: Number(day.views && day.views.count) || 0,
      uniques: Number(day.views && day.views.uniques) || 0,
    },
    clones: {
      count: Number(day.clones && day.clones.count) || 0,
      uniques: Number(day.clones && day.clones.uniques) || 0,
    },
  };
}

function normalizeTrafficRows(rows) {
  const byDate = new Map();
  for (const row of rows || []) {
    const date = dateOnly(row.timestamp);
    if (!date) {
      continue;
    }
    byDate.set(date, {
      count: Number(row.count) || 0,
      uniques: Number(row.uniques) || 0,
    });
  }
  return byDate;
}

function addDays(date, days) {
  const next = new Date(`${date}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + days);
  return next.toISOString().slice(0, 10);
}

function fetchedDateRange(viewsByDate, clonesByDate) {
  const fetchedDates = [...viewsByDate.keys(), ...clonesByDate.keys()].sort();
  if (!fetchedDates.length) {
    return [];
  }

  const dates = [];
  let date = fetchedDates[0];
  const endDate = fetchedDates[fetchedDates.length - 1];
  while (date <= endDate) {
    dates.push(date);
    date = addDays(date, 1);
  }
  return dates;
}

function readExisting(filePath, owner, repo) {
  if (!fs.existsSync(filePath)) {
    return baseDocument(owner, repo);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  if (parsed.schemaVersion !== SCHEMA_VERSION) {
    throw new Error(`Unsupported metrics schemaVersion: ${parsed.schemaVersion}`);
  }
  return parsed;
}

function baseDocument(owner, repo) {
  return {
    schemaVersion: SCHEMA_VERSION,
    repository: {
      owner,
      name: repo,
      fullName: `${owner}/${repo}`,
      url: `https://github.com/${owner}/${repo}`,
    },
    generatedAt: null,
    summary: {
      stars: null,
      forks: null,
      openIssues: null,
      watchers: null,
      defaultBranch: null,
      lastPushedAt: null,
    },
    daily: [],
    windows: {
      '7d': null,
      '30d': null,
      '90d': null,
      '365d': null,
      all: null,
    },
  };
}

function mergeDaily(existingDaily, viewsByDate, clonesByDate) {
  const byDate = new Map();
  for (const day of existingDaily || []) {
    if (day && day.date) {
      byDate.set(day.date, normalizeDay(day));
    }
  }

  const dates = new Set(fetchedDateRange(viewsByDate, clonesByDate));
  for (const date of dates) {
    const current = byDate.get(date) || {date, views: emptyMetric(), clones: emptyMetric()};
    current.views = viewsByDate.get(date) || emptyMetric();
    current.clones = clonesByDate.get(date) || emptyMetric();
    byDate.set(date, current);
  }

  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function summarizeWindow(daily, key, size) {
  if (!daily.length) {
    return null;
  }

  const selected = size ? daily.slice(-size) : daily.slice();
  if (!selected.length) {
    return null;
  }

  return selected.reduce(
    (window, day) => {
      window.views += day.views.count;
      window.viewUniques += day.views.uniques;
      window.clones += day.clones.count;
      window.cloneUniques += day.clones.uniques;
      return window;
    },
    {
      key,
      label: key === 'all' ? 'All collected' : `Last ${size} days`,
      startDate: selected[0].date,
      endDate: selected[selected.length - 1].date,
      days: selected.length,
      views: 0,
      viewUniques: 0,
      clones: 0,
      cloneUniques: 0,
    },
  );
}

function computeWindows(daily) {
  return Object.fromEntries(WINDOWS.map(([key, size]) => [key, summarizeWindow(daily, key, size)]));
}

async function fetchJson(url, token) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'gojang-docs-metrics-collector',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API request failed (${response.status}) for ${url}: ${body}`);
  }

  return response.json();
}

async function collect() {
  const owner = process.env.GOJANG_METRICS_OWNER || DEFAULT_OWNER;
  const repo = process.env.GOJANG_METRICS_REPO || DEFAULT_REPO;
  const outputPath = path.resolve(process.cwd(), process.env.GOJANG_METRICS_OUTPUT || DEFAULT_OUTPUT);
  const token = process.env.GH_METRICS_TOKEN || process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('Set GH_METRICS_TOKEN or GITHUB_TOKEN before running metrics:collect.');
  }

  const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;
  const [repoInfo, views, clones] = await Promise.all([
    fetchJson(baseUrl, token),
    fetchJson(`${baseUrl}/traffic/views?per=day`, token),
    fetchJson(`${baseUrl}/traffic/clones?per=day`, token),
  ]);

  const existing = readExisting(outputPath, owner, repo);
  const daily = mergeDaily(
    existing.daily,
    normalizeTrafficRows(views.views),
    normalizeTrafficRows(clones.clones),
  );

  const document = {
    schemaVersion: SCHEMA_VERSION,
    repository: {
      owner,
      name: repo,
      fullName: `${owner}/${repo}`,
      url: repoInfo.html_url || `https://github.com/${owner}/${repo}`,
    },
    generatedAt: isoNow(),
    summary: {
      stars: Number(repoInfo.stargazers_count) || 0,
      forks: Number(repoInfo.forks_count) || 0,
      openIssues: Number(repoInfo.open_issues_count) || 0,
      watchers: Number(repoInfo.subscribers_count || repoInfo.watchers_count) || 0,
      defaultBranch: repoInfo.default_branch || null,
      lastPushedAt: repoInfo.pushed_at || null,
    },
    daily,
    windows: computeWindows(daily),
  };

  fs.mkdirSync(path.dirname(outputPath), {recursive: true});
  fs.writeFileSync(outputPath, `${JSON.stringify(document, null, 2)}\n`);
  console.log(`Wrote ${daily.length} daily metric row(s) to ${path.relative(process.cwd(), outputPath)}`);
}

collect().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
