const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'quick-start',
        'installation',
        'quick-start-data-model',
        'project-structure',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'features',
        'architecture-separation',
        'htmx-patterns',
      ],
    },
    {
      type: 'category',
      label: 'Building Applications',
      items: [
        'creating-data-models',
        'creating-static-pages',
        'authentication-authorization',
      ],
    },
    {
      type: 'category',
      label: 'Deployment & Operations',
      items: [
        'deployment-guide',
        'distributed-deployment',
        'logging-guide',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'testing-best-practices',
        'taskfile-guide',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'SECURITY-SUMMARY',
        'contributing',
        'README',
      ],
    },
  ],
};

module.exports = sidebars;
