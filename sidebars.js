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
        'docs-index',
      ],
    },
    {
      type: 'category',
      label: 'Building Applications',
      items: [
        'creating-static-pages',
        'quick-start-data-model',
        'creating-data-models',
      ],
    },
    {
      type: 'category',
      label: 'AI Skills',
      items: [
        'ai-skills/overview',
        'ai-skills/add-data-model',
        'ai-skills/add-public-page',
        'ai-skills/admin-workspace',
        'ai-skills/auth-security',
        'ai-skills/operate-test',
        'ai-skills/render-htmx-ui',
      ],
    },
    {
      type: 'category',
      label: 'Security & Auth',
      items: [
        'authentication-authorization',
        'security-summary',
        'rate-limiting-guide',
      ],
    },
    {
      type: 'category',
      label: 'Rendering & HTMX',
      items: [
        'htmx-patterns',
        'html-renderer-guide',
        'rendering-primitives-guide',
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
        'contributing',
      ],
    },
  ],
};

module.exports = sidebars;
