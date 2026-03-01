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
            href="https://bitchill.app"
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
            title="Automated DCA"
            description="Set your schedule once and let BitChill handle the rest. Periodic purchases happen automatically, removing the stress of timing the market."
          />
          <Feature
            title="Earn While You Wait"
            description="Your stablecoins earn yield in lending protocols (Tropykus, Sovryn) while waiting to be swapped for Bitcoin."
          />
          <Feature
            title="Non-Custodial"
            description="Maintain full control of your funds at all times. BitChill smart contracts are audited and open source."
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
