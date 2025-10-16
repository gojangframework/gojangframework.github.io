// Docusaurus config for Gojang docs
module.exports = {
  title: 'Gojang Framework',
  tagline: 'A modern, batteries-included web framework for Go and HTMX',
  url: 'https://gojangframework.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/gojang_favicon.png',
  organizationName: 'gojangframework', // GitHub org/user
  projectName: 'gojangframework.github.io', // repo name for deployment
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/gojangframework/gojang/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Gojang',
      logo: {
        alt: 'Gojang Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/quick-start',
          label: 'Quick Start',
          position: 'left',
        },
        {
          to: '/docs/features',
          label: 'Features',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'left',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/gojangframework/gojang',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/gojangframework/gojang/discussions',
            },
            {
              label: 'Report Issues',
              href: 'https://github.com/gojangframework/gojang/issues',
            },
          ],
        },
        {
          href: 'https://github.com/gojangframework/gojang',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: 'docs/intro'},
            {label: 'Quick Start', to: 'docs/quick-start'},
            {label: 'Features', to: 'docs/features'},
            {label: 'Installation', to: 'docs/installation'},
          ],
        },
        {
          title: 'Guides',
          items: [
            {label: 'Creating Data Models', to: 'docs/creating-data-models'},
            {label: 'HTMX Patterns', to: 'docs/htmx-patterns'},
            {label: 'Deployment Guide', to: 'docs/deployment-guide'},
            {label: 'Testing', to: 'docs/testing-best-practices'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: 'https://github.com/gojangframework/gojang'},
            {label: 'GitHub Discussions', href: 'https://github.com/gojangframework/gojang/discussions'},
            {label: 'Issues', href: 'https://github.com/gojangframework/gojang/issues'},
            {label: 'Contributing', to: 'docs/contributing'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Security', to: 'docs/SECURITY-SUMMARY'},
            {label: 'Project Structure', to: 'docs/project-structure'},
            {label: 'Architecture', to: 'docs/architecture-separation'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gojang Framework. Built with Docusaurus.`,
    },
  },
};
