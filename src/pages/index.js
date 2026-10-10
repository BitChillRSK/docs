import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://dca.bitchill.app"
            style={{marginLeft: '1rem'}}>
            Launch App
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--lg">
        <Heading as="h3">{title}</Heading>
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
          <Feature
            title="Scheduled buys"
            description="You set a stablecoin, a route, and a cadence in whole UTC days. A purchase has no guaranteed minute, and a missed day is not caught up."
          />
          <Feature
            title="Idle or lending"
            description="The idle route earns no lending yield. LayerBank can lend DOC, USDRIF, and USDT0. Sovryn can lend DOC. Tropykus is not a route."
          />
          <Feature
            title="Your exit"
            description="You withdraw, delete, and claim rBTC from your account. The protocol contracts are not deployed. No manual audit of this version is published."
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Documentation"
      description="BitChill - Dollar Cost Average into Bitcoin on Rootstock">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
