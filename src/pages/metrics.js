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

const CHART_MODE_OPTIONS = [
  {key: 'daily', label: 'Daily count'},
  {key: 'total', label: 'Total count'},
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

function getNiceScale(maxValue) {
  const safeMax = Math.max(maxValue, 1);
  const rawStep = safeMax / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalizedStep = rawStep / magnitude;
  const niceStep = normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10;
  const step = niceStep * magnitude;
  const max = Math.ceil(safeMax / step) * step;
  const ticks = [];

  for (let tick = 0; tick <= max; tick += step) {
    ticks.push(tick);
  }

  return {max, ticks};
}

function getDateTickIndexes(points) {
  if (points.length <= 1) {
    return [0];
  }

  const tickCount = points.length > 30 ? 5 : 3;
  const lastIndex = points.length - 1;

  return Array.from({length: tickCount}, (_, index) => Math.round((lastIndex * index) / (tickCount - 1)))
    .filter((index, position, indexes) => indexes.indexOf(index) === position);
}

function buildPolyline(points, getX, getY, getValue) {
  if (!points.length) {
    return '';
  }

  return points
    .map((point, index) => `${getX(index).toFixed(2)},${getY(getValue(point)).toFixed(2)}`)
    .join(' ');
}

function buildChartRows(daily, chartMode) {
  let totalViews = 0;
  let totalClones = 0;

  return daily.map((day) => {
    totalViews += day.views.count;
    totalClones += day.clones.count;

    return {
      ...day,
      viewsValue: chartMode === 'total' ? totalViews : day.views.count,
      clonesValue: chartMode === 'total' ? totalClones : day.clones.count,
    };
  });
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

function ChartModeSelect({chartMode, onChange}) {
  return (
    <label className={styles.chartModeSelect}>
      <span>Chart value</span>
      <select value={chartMode} onChange={(event) => onChange(event.target.value)}>
        {CHART_MODE_OPTIONS.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
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

function TrendChart({daily, chartMode}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const width = 760;
  const height = 320;
  const plot = {
    left: 64,
    right: 24,
    top: 24,
    bottom: 68,
  };
  const latest = daily[daily.length - 1];

  if (!daily.length) {
    return (
      <div className={styles.emptyTrend}>
        Collection will begin after the scheduled metrics workflow runs.
      </div>
    );
  }

  const chartRows = buildChartRows(daily, chartMode);
  const axisLabel = chartMode === 'total' ? 'Total count' : 'Daily count';
  const valueLabel = chartMode === 'total' ? 'total' : 'daily';
  const plotWidth = width - plot.left - plot.right;
  const plotHeight = height - plot.top - plot.bottom;
  const rawMax = Math.max(...chartRows.flatMap((day) => [day.viewsValue, day.clonesValue]));
  const {max: yMax, ticks: yTicks} = getNiceScale(rawMax);
  const xStep = chartRows.length > 1 ? plotWidth / (chartRows.length - 1) : plotWidth;
  const getX = (index) => plot.left + (chartRows.length > 1 ? index * xStep : plotWidth / 2);
  const getY = (value) => plot.top + plotHeight - (value / yMax) * plotHeight;
  const viewsLine = buildPolyline(chartRows, getX, getY, (day) => day.viewsValue);
  const clonesLine = buildPolyline(chartRows, getX, getY, (day) => day.clonesValue);
  const dateTickIndexes = getDateTickIndexes(chartRows);
  const activeIndex = Math.min(hoveredIndex === null ? chartRows.length - 1 : hoveredIndex, chartRows.length - 1);
  const activeDay = chartRows[activeIndex];
  const latestRow = chartRows[chartRows.length - 1];
  const activeX = getX(activeIndex);
  const activeY = Math.max(64, Math.min(getY(activeDay.viewsValue), getY(activeDay.clonesValue)));
  const tooltipAlignLeft = activeX < width * 0.55;
  const showTooltip = hoveredIndex !== null;

  return (
    <div className={styles.trendWrap}>
      <div className={styles.chartFrame} onMouseLeave={() => setHoveredIndex(null)} onPointerLeave={() => setHoveredIndex(null)}>
        <svg
          className={styles.trendChart}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Daily views and clones trend">
          <g className={styles.gridLines}>
            {yTicks.map((tick) => {
              const y = getY(tick);
              return (
                <line
                  key={tick}
                  x1={plot.left}
                  y1={y}
                  x2={width - plot.right}
                  y2={y}
                />
              );
            })}
          </g>
          <line
            x1={plot.left}
            y1={height - plot.bottom}
            x2={width - plot.right}
            y2={height - plot.bottom}
            className={styles.axisLine}
          />
          <line
            x1={plot.left}
            y1={plot.top}
            x2={plot.left}
            y2={height - plot.bottom}
            className={styles.axisLine}
          />
          <g className={styles.axisLabels}>
            {yTicks.map((tick) => {
              const y = getY(tick);
              return (
                <text key={tick} x={plot.left - 12} y={y + 4} textAnchor="end">
                  {formatNumber(tick)}
                </text>
              );
            })}
            {dateTickIndexes.map((index) => (
              <text
                key={chartRows[index].date}
                x={getX(index)}
                y={height - plot.bottom + 24}
                textAnchor={index === 0 ? 'start' : index === chartRows.length - 1 ? 'end' : 'middle'}>
                {formatDate(chartRows[index].date)}
              </text>
            ))}
          </g>
          <text className={styles.axisTitle} x={(plot.left + width - plot.right) / 2} y={height - 12} textAnchor="middle">
            Date
          </text>
          <text
            className={styles.axisTitle}
            x={-((plot.top + height - plot.bottom) / 2)}
            y={18}
            textAnchor="middle"
            transform="rotate(-90)">
            {axisLabel}
          </text>
          <polyline points={viewsLine} className={styles.viewsLine} />
          <polyline points={clonesLine} className={styles.clonesLine} />
          <line
            x1={activeX}
            y1={plot.top}
            x2={activeX}
            y2={height - plot.bottom}
            className={styles.hoverLine}
          />
          <circle
            cx={activeX}
            cy={getY(activeDay.viewsValue)}
            r="5"
            className={styles.viewsPoint}
          />
          <circle
            cx={activeX}
            cy={getY(activeDay.clonesValue)}
            r="5"
            className={styles.clonesPoint}
          />
          <g className={styles.hoverTargets}>
            {chartRows.map((day, index) => {
              const targetX = getX(index) - xStep / 2;
              const targetWidth = chartRows.length > 1 ? xStep : plotWidth;

              return (
                <rect
                  key={day.date}
                  x={chartRows.length > 1 ? targetX : plot.left}
                  y={plot.top}
                  width={targetWidth}
                  height={plotHeight}
                  tabIndex={0}
                  role="button"
                  aria-label={`${formatDate(day.date)}: ${formatNumber(day.viewsValue)} ${valueLabel} views and ${formatNumber(day.clonesValue)} ${valueLabel} clones`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseMove={() => setHoveredIndex(index)}
                  onPointerEnter={() => setHoveredIndex(index)}
                  onPointerMove={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onPointerLeave={() => setHoveredIndex(null)}
                  onBlur={() => setHoveredIndex(null)}
                />
              );
            })}
          </g>
        </svg>
        {showTooltip && (
          <div
            className={`${styles.trendTooltip} ${tooltipAlignLeft ? styles.tooltipRight : styles.tooltipLeft}`}
            style={{
              left: `${(activeX / width) * 100}%`,
              top: `${(activeY / height) * 100}%`,
            }}
            aria-live="polite">
            <strong>{formatDate(activeDay.date)}</strong>
            <span className={styles.tooltipViews}>{formatNumber(activeDay.viewsValue)} {valueLabel} views</span>
            <span>{formatNumber(activeDay.views.uniques)} daily unique viewers</span>
            <span className={styles.tooltipClones}>{formatNumber(activeDay.clonesValue)} {valueLabel} clones</span>
            <span>{formatNumber(activeDay.clones.uniques)} daily unique cloners</span>
          </div>
        )}
      </div>
      <div className={styles.trendMeta}>
        <span>{formatDate(daily[0].date)}</span>
        <span>
          {chartMode === 'total' ? 'Total' : 'Latest'}: {formatNumber(latestRow.viewsValue)} views, {formatNumber(latestRow.clonesValue)} clones
        </span>
        <span>{formatDate(latest.date)}</span>
      </div>
    </div>
  );
}

export default function MetricsPage() {
  const [activeRange, setActiveRange] = useState('30d');
  const [chartMode, setChartMode] = useState('daily');
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
                <div className={styles.panelControls}>
                  <ChartModeSelect chartMode={chartMode} onChange={setChartMode} />
                  <RangeTabs activeRange={activeRange} onChange={setActiveRange} />
                </div>
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
              <TrendChart daily={visibleDaily} chartMode={chartMode} />
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
