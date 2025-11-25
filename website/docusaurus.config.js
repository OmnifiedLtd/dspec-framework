// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'dspec-framework',
  tagline: 'Declarative, Friendly, Formal Specifications for Modern Software',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://OmnifiedLtd.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/dspec-framework/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OmnifiedLtd', // Usually your GitHub org/user name.
  projectName: 'dspec-framework', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  // Enable Docusaurs Faster: https://github.com/facebook/docusaurus/issues/10556
  future: {
    experimental_faster: true,
    v4: true
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/OmnifiedLtd/dspec-framework/tree/main',
          docItemComponent: '@theme/ApiItem' // Derived from docusaurus-theme-openapi
        },
        blog: false, // Disable default blog plugin as we use the custom one below
        theme: {
          customCss: './src/css/custom.css'
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml'
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'dspec-framework',
        logo: {
          alt: 'dspec-framework Logo',
          src: 'img/logo.svg'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs'
          },
          {
            to: '/docs/appendix-a-json-schemas',
            label: 'Schemas',
            position: 'left'
          },
          {
            'href': 'https://github.com/OmnifiedLtd/dspec-framework',
            'position': 'right',
            'className': 'header-github-link',
            'aria-label': 'GitHub repository'
          }
        ]
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true
        }
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/purpose-and-scope'
              }
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/dspec'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'Schemas',
                to: '/docs/appendix-a-json-schemas'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/OmnifiedLtd/dspec-framework'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} dspec-framework. Built with Docusaurus.`
      },
      prism: {
        additionalLanguages: ['json', 'bash', 'yaml']
      }
    }),

  themes: [
    '@docusaurus/theme-mermaid',
    // [
    //   require.resolve('@easyops-cn/docusaurus-search-local'),
    //   {
    //     indexPages: true,
    //     docsRouteBasePath: '/docs',
    //     hashed: true,
    //     language: ['en'],
    //     highlightSearchTermsOnTargetPage: false,
    //     searchResultContextMaxLength: 50,
    //     searchResultLimits: 8,
    //     searchBarShortcut: true,
    //     searchBarShortcutHint: true
    //   }
    // ],
    'docusaurus-theme-openapi-docs'
  ],
  plugins: [
    ['./src/plugins/webpack-alias.js', {}],
    ['./src/plugins/tailwind-config.js', {}],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'classic',
        config: {}
      }
    ],
    [
      'ideal-image',
      /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
      ({
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true
      })
    ],
    // [
    //   './src/plugins/blog-plugin',
    //   {
    //     path: 'blog',
    //     editLocalizedFiles: false,
    //     blogTitle: 'Blog',
    //     blogDescription: 'Updates from the dspec-framework team',
    //     blogSidebarCount: 'ALL',
    //     blogSidebarTitle: 'Latest Posts',
    //     routeBasePath: 'blog',
    //     include: ['**/*.md', '**/*.mdx'],
    //     exclude: [
    //       '**/_*.{js,jsx,ts,tsx,md,mdx}',
    //       '**/_*/**',
    //       '**/*.test.{js,jsx,ts,tsx}',
    //       '**/__tests__/**'
    //     ],
    //     postsPerPage: 6,
    //     truncateMarker: /<!--\s*(truncate)\s*-->/,
    //     showReadingTime: true,
    //     onUntruncatedBlogPosts: 'ignore',
    //     editUrl: 'https://github.com/OmnifiedLtd/dspec-framework/tree/main/',
    //     remarkPlugins: [
    //       [
    //         require('@docusaurus/remark-plugin-npm2yarn'),
    //         {
    //           sync: true
    //         }
    //       ]
    //     ]
    //   }
    // ],
    // Custom plugin to configure Webpack for YAML handling
    function yamlLoaderPlugin(context, options) {
      return {
        name: 'yaml-loader-plugin',
        configureWebpack(config, isServer, utils) {
          return {
            module: {
              rules: [
                {
                  test: /\.yaml$/,
                  use: 'yaml-loader'
                }
              ]
            }
          }
        }
      }
    }
  ]
}

export default config
