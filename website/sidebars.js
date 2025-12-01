/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: false,
      items: [
        'purpose-and-scope',
        'applicability',
        'planning-for-change',
        'intent-engineering',
        'core-principles',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: true,
      items: [
        'features',
        'domain-models-and-bounded-contexts',
        'events-as-facts-vs-messages',
        'why-aggregates-not-at-level-0',
      ],
    },
    {
      type: 'category',
      label: 'Tiered Specs',
      collapsed: true,
      items: [
        'spec-levels-at-a-glance',
        'level-0-feature-dspec',
        'level-1-design-dspec',
        'level-2-implementation-dspec',
      ],
    },
    {
      type: 'category',
      label: 'Guides & Governance',
      collapsed: true,
      items: [
        'how-to-use',
        'traceability-and-governance',
        'appendix-b-level-0-checklist',
      ],
    },
    {
      type: 'category',
      label: 'Influences',
      collapsed: true,
      items: [
        'relation-to-wbs',
        'influence-ddd',
        'influence-uncle-bob',
        'influence-dmmf',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'domain-models-examples',
        'appendix-c-pattern-library',
        'appendix-a-json-schemas',
      ],
    },
  ],
};

export default sidebars;
