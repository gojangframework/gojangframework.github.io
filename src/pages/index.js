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
        {/* <img src="img/gojang_logo.png" alt="Gojang Logo" width="500" /> */}
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/quick-start">
            Get Started in 5 Minutes ⚡
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/intro"
            style={{marginLeft: '1rem'}}>
            Learn More
          </Link>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: '🔋 Batteries Included',
    description: (
      <>
        Everything you need out of the box: authentication, admin panel, ORM, 
        security features, and more. Start building features, not infrastructure.
      </>
    ),
  },
  {
    title: '⚡ HTMX First',
    description: (
      <>
        Build modern, dynamic web applications without heavy JavaScript frameworks. 
        HTMX integration lets you create rich interactions with minimal code.
      </>
    ),
  },
  {
    title: '🛡️ Type Safe',
    description: (
      <>
        Powered by Ent ORM for compile-time type safety. Catch errors early 
        and refactor with confidence. GraphQL-like queries in Go.
      </>
    ),
  },
  {
    title: '🚀 Production Ready',
    description: (
      <>
        Built-in security best practices, structured logging, middleware, 
        audit trails, and comprehensive testing support. Deploy with confidence.
      </>
    ),
  },
  {
    title: '🎨 Auto-Generated Admin',
    description: (
      <>
        Reflection-based admin panel that automatically provides CRUD interfaces 
        for any model. No manual admin code needed.
      </>
    ),
  },
  {
    title: '📦 Developer Experience',
    description: (
      <>
        Task-based automation, hot reload with Air, powerful generators, 
        and clear project structure. Focus on building features.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
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
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
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
            <h2>Quick Start</h2>
            <p>Get up and running in minutes:</p>
            <pre>
              <code>{`# Clone the repository
git clone https://github.com/gojangframework/gojang
cd gojang

# Install Task automation
go install github.com/go-task/task/v3/cmd/task@latest

# Setup and run
task migrate
task seed
task dev

# Your app is now running at http://localhost:8080 🎉`}</code>
            </pre>
            <Link
              className="button button--primary button--lg"
              to="/docs/quick-start">
              View Full Quick Start Guide →
            </Link>
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
      title={`${siteConfig.title} - Modern Go Web Framework`}
      description="A modern, batteries-included web framework for Go and HTMX. Build dynamic web applications with minimal JavaScript.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <CodeExample />
      </main>
    </Layout>
  );
}
