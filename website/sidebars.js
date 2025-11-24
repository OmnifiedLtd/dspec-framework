/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: false,
      items: [
        '01-purpose-and-scope',
        'philosophy',
        '03-core-principles',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        '06-bounded-contexts-and-domain-models',
        '04-events-as-facts-vs-messages',
        '11-why-aggregates-not-at-level-0',
      ],
    },
    {
      type: 'category',
      label: 'Tiered Specs',
      collapsed: false,
      items: [
        '05-spec-levels-at-a-glance',
        '08-level-0-feature-dspec',
        '09-level-1-design-dspec',
        '10-level-2-implementation-dspec',
      ],
    },
    {
      type: 'category',
      label: 'Guides & Governance',
      collapsed: true,
      items: [
        'how-to-use',
        '13-adoption-guide',
        '12-traceability-and-governance',
        '15-appendix-b-level-0-checklist',
      ],
    },
    {
      type: 'category',
      label: 'Influences',
      collapsed: true,
      items: [
        '02-relation-to-wbs',
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
        '07-domain-models-examples',
        '16-appendix-c-pattern-library',
        '14-appendix-a-json-schemas',
      ],
    },
  ],
};

export default sidebars;
