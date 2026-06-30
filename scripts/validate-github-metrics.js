#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = path.resolve(process.cwd(), process.env.GOJANG_METRICS_OUTPUT || path.join('src', 'data', 'gojangRepoMetrics.json'));
const errors = [];

function isIsoDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isNumberOrNull(value) {
  return value === null || typeof value === 'number';
}

function addError(message) {
  errors.push(message);
}

if (!fs.existsSync(filePath)) {
  addError(`Missing metrics file: ${filePath}`);
} else {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (data.schemaVersion !== 1) {
    addError('schemaVersion must be 1.');
  }
  if (!data.repository || data.repository.fullName !== 'gojangframework/gojang') {
    addError('repository.fullName must be gojangframework/gojang.');
  }
  if (!(data.generatedAt === null || !Number.isNaN(Date.parse(data.generatedAt)))) {
    addError('generatedAt must be null or a valid ISO timestamp.');
  }

  const summary = data.summary || {};
  for (const key of ['stars', 'forks', 'openIssues', 'watchers']) {
    if (!isNumberOrNull(summary[key])) {
      addError(`summary.${key} must be a number or null.`);
    }
  }

  if (!Array.isArray(data.daily)) {
    addError('daily must be an array.');
  } else {
    let previousDate = '';
    for (const [index, day] of data.daily.entries()) {
      if (!isIsoDate(day.date)) {
        addError(`daily[${index}].date must be YYYY-MM-DD.`);
      }
      if (previousDate && day.date <= previousDate) {
        addError(`daily[${index}].date must be sorted ascending and unique.`);
      }
      previousDate = day.date;
      for (const metricKey of ['views', 'clones']) {
        const metric = day[metricKey] || {};
        if (!Number.isInteger(metric.count) || metric.count < 0) {
          addError(`daily[${index}].${metricKey}.count must be a non-negative integer.`);
        }
        if (!Number.isInteger(metric.uniques) || metric.uniques < 0) {
          addError(`daily[${index}].${metricKey}.uniques must be a non-negative integer.`);
        }
      }
    }
  }

  const windows = data.windows || {};
  for (const key of ['7d', '30d', '90d', '365d', 'all']) {
    const window = windows[key];
    if (window === null) {
      continue;
    }
    if (!window || window.key !== key) {
      addError(`windows.${key}.key must match ${key}.`);
      continue;
    }
    if (!isIsoDate(window.startDate) || !isIsoDate(window.endDate)) {
      addError(`windows.${key} must include startDate and endDate as YYYY-MM-DD.`);
    }
    for (const metricKey of ['days', 'views', 'viewUniques', 'clones', 'cloneUniques']) {
      if (!Number.isInteger(window[metricKey]) || window[metricKey] < 0) {
        addError(`windows.${key}.${metricKey} must be a non-negative integer.`);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Metrics data is valid: ${path.relative(process.cwd(), filePath)}`);
