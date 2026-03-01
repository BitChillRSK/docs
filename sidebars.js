/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'intro',
        'getting-started/how-dca-works',
        'getting-started/supported-assets',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      collapsed: false,
      items: [
        'user-guide/connect-wallet',
        'user-guide/create-schedule',
        'user-guide/manage-schedules',
        'user-guide/withdraw-rbtc',
        'user-guide/earning-yield',
        'user-guide/fees',
      ],
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      collapsed: true,
      items: [
        'contracts/architecture',
        'contracts/core-contracts',
        'contracts/addresses',
        'contracts/integration',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      collapsed: true,
      items: [
        'security/audits',
        'security/security-model',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      collapsed: true,
      items: [
        'resources/faq',
        'resources/glossary',
        'resources/links',
      ],
    },
  ],
};

export default sidebars;
