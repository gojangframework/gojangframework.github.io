import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className={styles.version}>v0.3.2 documentation</p>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/quick-start">
            Get Started
          </Link>
          <Link className="button button--outline button--lg" to="/docs/ai-skills/overview">
            AI Skills
          </Link>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'AI-native workflow',
    description: (
      <>
        Built-in skills help agents add data models, public pages, admin behavior,
        auth changes, tests, and HTMX UI using Gojang conventions.
      </>
    ),
  },
  {
    title: 'Batteries included',
    description: (
      <>
        Authentication, sessions, CSRF, Ent models, admin CRUD, logging, email,
        rate limiting, and deployment guidance are ready from the start.
      </>
    ),
  },
  {
    title: 'HTMX first',
    description: (
      <>
        Build dynamic interfaces with Go templates, partial rendering, reusable
        components, and small server-rendered HTMX responses.
      </>
    ),
  },
  {
    title: 'Admin workspace',
    description: (
      <>
        Generated Ent models are discovered automatically and surfaced through an
        Airtable-style staff workspace with registry-based customization.
      </>
    ),
  },
  {
    title: 'Modern auth',
    description: (
      <>
        Email verification, forgot-password and reset-password flows, SES with
        SMTP fallback, and reCAPTCHA v3 support are documented and integrated.
      </>
    ),
  },
  {
    title: 'Production ready',
    description: (
      <>
        Security headers, HTTPS enforcement, structured logging, deployment
        guides, backups, monitoring, and distributed deployment patterns are covered.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.feature}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeExample() {
  return (
    <section className={styles.codeExample}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Run Gojang locally</h2>
            <p>Clone, configure, generate models, and start the dev server.</p>
            <pre>
              <code>{`git clone https://github.com/gojangframework/gojang
cd gojang
cp .env.example .env
go mod download
task schema-gen
task dev

# Seed the first admin account when ready
task seed`}</code>
            </pre>
            <div className={styles.codeActions}>
              <Link className="button button--primary button--lg" to="/docs/quick-start">
                Full Quick Start
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/creating-data-models">
                Build With Data
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - AI-native Go and HTMX framework`}
      description="Gojang is an AI-native, batteries-included web framework for Go and HTMX with auth, admin, Ent, HTMX, security, and production guidance.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <CodeExample />
      </main>
    </Layout>
  );
}
