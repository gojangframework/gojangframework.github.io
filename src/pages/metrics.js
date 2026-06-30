import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import metrics from '../data/gojangRepoMetrics.json';
import styles from './metrics.module.css';

const RANGE_OPTIONS = [
  {key: '7d', label: '7D'},
  {key: '30d', label: '30D'},
  {key: '90d', label: '90D'},
  {key: '365d', label: '1Y'},
  {key: 'all', label: 'All'},
];

function formatNumber(value) {
  if (value === null || value === undefined) {
    return 'Pending';
  }
  return new Intl.NumberFormat('en-US').format(value);
}

function formatDateTime(value) {
  if (!value) {
    return 'Not collected yet';
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(value));
}

function formatDate(value) {
  if (!value) {
    return 'Pending';
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

function isStale(value) {
  if (!value) {
    return true;
  }
  return Date.now() - new Date(value).getTime() > 48 * 60 * 60 * 1000;
}

function sliceDailyForWindow(daily, rangeKey) {
  const option = RANGE_OPTIONS.find((range) => range.key === rangeKey);
  if (!option || option.key === 'all') {
    return daily;
  }
  const count = Number.parseInt(option.key, 10);
  return daily.slice(-count);
}

function buildPolyline(points, width, height, getValue) {
  if (!points.length) {
    return '';
  }

  const values = points.map(getValue);
  const max = Math.max(...values, 1);
  const xStep = points.length > 1 ? width / (points.length - 1) : width;

  return values
    .map((value, index) => {
      const x = points.length > 1 ? index * xStep : width / 2;
      const y = height - (value / max) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}

function MetricCard({label, value, detail}) {
  return (
    <div className={styles.metricCard}>
      <span>{label}</span>
      <strong>{formatNumber(value)}</strong>
      {detail && <small>{detail}</small>}
    </div>
  );
}

function RangeTabs({activeRange, onChange}) {
  return (
    <div className={styles.rangeTabs} role="tablist" aria-label="Metric range">
      {RANGE_OPTIONS.map((range) => (
        <button
          key={range.key}
          className={activeRange === range.key ? styles.activeRange : undefined}
          type="button"
          role="tab"
          aria-selected={activeRange === range.key}
          onClick={() => onChange(range.key)}>
          {range.label}
        </button>
      ))}
    </div>
  );
}

function TrendChart({daily}) {
  const width = 720;
  const height = 220;
  const paddedHeight = 180;
  const viewsLine = buildPolyline(daily, width, paddedHeight, (day) => day.views.count);
  const clonesLine = buildPolyline(daily, width, paddedHeight, (day) => day.clones.count);
  const latest = daily[daily.length - 1];

  if (!daily.length) {
    return (
      <div className={styles.emptyTrend}>
        Collection will begin after the scheduled metrics workflow runs.
      </div>
    );
  }

  return (
    <div className={styles.trendWrap}>
      <svg className={styles.trendChart} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Daily views and clones trend">
        <line x1="0" y1={paddedHeight} x2={width} y2={paddedHeight} className={styles.axisLine} />
        <polyline points={viewsLine} className={styles.viewsLine} />
        <polyline points={clonesLine} className={styles.clonesLine} />
      </svg>
      <div className={styles.trendMeta}>
        <span>{formatDate(daily[0].date)}</span>
        <span>
          Latest: {formatNumber(latest.views.count)} views, {formatNumber(latest.clones.count)} clones
        </span>
        <span>{formatDate(latest.date)}</span>
      </div>
    </div>
  );
}

export default function MetricsPage() {
  const [activeRange, setActiveRange] = useState('30d');
  const stale = isStale(metrics.generatedAt);
  const daily = metrics.daily || [];
  const activeWindow = metrics.windows && metrics.windows[activeRange];
  const visibleDaily = useMemo(() => sliceDailyForWindow(daily, activeRange), [daily, activeRange]);

  return (
    <Layout
      title="Repository Metrics"
      description="Aggregate repository metrics for the Gojang framework GitHub repository.">
      <main className={styles.metricsPage}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.kicker}>Repository metrics</p>
                <h1>Gojang activity</h1>
                <p>
                  Aggregate GitHub repository signals for{' '}
                  <Link to={metrics.repository.url}>{metrics.repository.fullName}</Link>.
                </p>
              </div>
              <div className={stale ? styles.statusStale : styles.statusFresh}>
                <span>{stale ? 'Stale' : 'Fresh'}</span>
                <strong>{formatDateTime(metrics.generatedAt)}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.metricsSection}>
          <div className="container">
            <div className={styles.metricGrid}>
              <MetricCard label="Stars" value={metrics.summary.stars} />
              <MetricCard label="Forks" value={metrics.summary.forks} />
              <MetricCard label="Open issues" value={metrics.summary.openIssues} />
              <MetricCard label="Watchers" value={metrics.summary.watchers} />
            </div>

            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <h2>Traffic Trend</h2>
                  <p>
                    {activeWindow
                      ? `${formatDate(activeWindow.startDate)} to ${formatDate(activeWindow.endDate)}`
                      : 'Waiting for the first collected traffic window.'}
                  </p>
                </div>
                <RangeTabs activeRange={activeRange} onChange={setActiveRange} />
              </div>

              <div className={styles.windowGrid}>
                <MetricCard
                  label="Views"
                  value={activeWindow && activeWindow.views}
                  detail="Total page views"
                />
                <MetricCard
                  label="View uniques"
                  value={activeWindow && activeWindow.viewUniques}
                  detail="Daily unique sum"
                />
                <MetricCard
                  label="Clones"
                  value={activeWindow && activeWindow.clones}
                  detail="Total git clones"
                />
                <MetricCard
                  label="Clone uniques"
                  value={activeWindow && activeWindow.cloneUniques}
                  detail="Daily unique sum"
                />
              </div>

              <div className={styles.legend}>
                <span className={styles.viewsLegend}>Views</span>
                <span className={styles.clonesLegend}>Clones</span>
              </div>
              <TrendChart daily={visibleDaily} />
            </div>

            <div className={styles.metaGrid}>
              <div>
                <span>Default branch</span>
                <strong>{metrics.summary.defaultBranch || 'Pending'}</strong>
              </div>
              <div>
                <span>Last pushed</span>
                <strong>{formatDateTime(metrics.summary.lastPushedAt)}</strong>
              </div>
              <div>
                <span>Stored days</span>
                <strong>{formatNumber(daily.length)}</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
