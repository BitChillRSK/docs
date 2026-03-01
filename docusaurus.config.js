// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BitChill Docs',
  tagline: 'Dollar Cost Average into Bitcoin on Rootstock',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.bitchill.app',
  baseUrl: '/',

  organizationName: 'BitChillRSK',
  projectName: 'docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/BitChillRSK/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/bitchill-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'BitChill',
        logo: {
          alt: 'BitChill Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://dca.bitchill.app',
            label: 'App',
            position: 'left',
          },
          {
            href: 'https://github.com/BitChillRSK',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://x.com/BitChillApp',
            label: 'Twitter',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs',
              },
              {
                label: 'User Guide',
                to: '/docs/user-guide/connect-wallet',
              },
              {
                label: 'Smart Contracts',
                to: '/docs/contracts/architecture',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://x.com/BitChillApp',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/BitChillRSK',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Launch App',
                href: 'https://dca.bitchill.app',
              },
              {
                label: 'Security & Audits',
                to: '/docs/security/audits',
              },
              {
                label: 'FAQ',
                to: '/docs/resources/faq',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BitChill. Built on Rootstock.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['solidity'],
      },
    }),
};

export default config;
