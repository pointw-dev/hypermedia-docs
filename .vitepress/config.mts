import {defineConfig, withBase} from 'vitepress'
import {fileURLToPath, URL} from 'node:url'

const hostname = 'https://pointw-dev.github.io'
const basePath = 'hypermedia-docs'
const seoLogo = 'https://pointw-dev.github.io/hypermedia-docs/img/hypermedia-card.png'
const title = 'hypermedia'
const tagline = 'Resilient API design using the power of the Web'

const siteUrl = hostname + (basePath? `/${basePath}/` : '')

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: title,
    description: tagline,

    themeConfig: {
        siteTitle: title,
        stackOverflowTags: ['hypermedia', 'rest', 'api'],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/pointw-dev/hypermea'},
            {icon: 'discord', link: 'https://discord.gg/2k5vqUTRqN'}
        ],
        logo: '/img/hero.svg',

        nav: [
            {text: 'Home', link: '/'},
            {text: 'Quickstart', link: '/introduction/quickstart'}
        ],

        outline: 'deep',
        sidebar: getSidebar(),
        search: {
            provider: 'local',
            options: {
                detailedView: true
            }
        },
        footer: {
            message: 'Released under the <a target="_blank" class="link" href="https://raw.githubusercontent.com/pointw-dev/hypermedia-docs/refs/heads/main/LICENSE">MIT License</a>.',
            copyright: 'Copyright © 2025 Michael Ottoson (pointw.com)'
        }
    },

    base: `/${basePath}/`,
    head: [
        ['link', {rel: 'icon', href: `/${basePath}/favicon.ico`}],

        // test with https://www.opengraph.xyz/url/
        ['meta', {property: 'og:image', content: seoLogo}],
        ['meta', {property: "og:url", content: siteUrl}],
        ['meta', {property: "og:description", content: tagline}],
        ['meta', {property: 'og:type', content: 'website'}],

        ['meta', {name: "twitter:card", content: "summary_large_image"}],
        ['meta', {name: 'twitter:image', content: seoLogo}],
        ['meta', {property: "twitter:domain", content: "pointw.com"}],
        ['meta', {property: "twitter:url", content: siteUrl}],
        ['meta', {name: "twitter:title", content: title}],
        ['meta', {name: "twitter:description", content: tagline}]

    ],
    srcDir: 'src',
    vite: {
        resolve: {
            alias: [
                {
                    find: /^.*\/VPFeature\.vue$/,
                    replacement: fileURLToPath(new URL('./overrides/VPFeature.vue', import.meta.url))
                }
            ]
        }
    },
    sitemap: {
        hostname: siteUrl
    },
    transformPageData(pageData) {
        const canonicalUrl = siteUrl + `${pageData.relativePath}`
            .replace(/index\.md$/, '')
            .replace(/\.md$/, '.html')

        pageData.frontmatter.head ??= []
        pageData.frontmatter.head.push([
            'link',
            { rel: 'canonical', href: canonicalUrl }
        ])
    }
})

function getSidebar() {
    return [
        {
            text: 'Introduction',
            items: [
                {
                    text: 'What is hypermedia?',
                    link: '/introduction/what-is'
                },
                {
                    text: 'Hypermedia in action',
                    link: '/introduction/hypermedia-in-action/',
                    items: [
                        {
                            text: 'Set up the demo',
                            link: '/introduction/hypermedia-in-action/setup-the-demo'
                        },
                        {
                            text: 'Launch Event Buddy v1',
                            collapsed: true,
                            link: '/introduction/hypermedia-in-action/v1/',
                            items: [
                                {
                                    text: 'Explore with Postman',
                                    link: '/introduction/hypermedia-in-action/v1/explore-with-postman'
                                },
                                {
                                    text: 'Run the clients',
                                    link: '/introduction/hypermedia-in-action/v1/run-the-clients'
                                },
                                {
                                    text: 'Client code review',
                                    link: '/introduction/hypermedia-in-action/v1/client-code-review'
                                },
                                {
                                    text: 'Architecture and protocol review',
                                    link: '/introduction/hypermedia-in-action/v1/architecture-and-protocol'
                                },
                                {
                                    text: 'Shutting it down',
                                    link: '/introduction/hypermedia-in-action/v1/shutting-it-down'
                                }
                            ]
                        },
                        {
                            text: 'Launch Event Buddy v2',
                            collapsed: true,
                            link: '/introduction/hypermedia-in-action/v2/',
                            items: [
                                {
                                    text: 'Explore with Postman',
                                    link: '/introduction/hypermedia-in-action/v2/explore-with-postman'
                                },
                                {
                                    text: 'Run the clients',
                                    link: '/introduction/hypermedia-in-action/v2/run-the-clients'
                                },
                                {
                                    text: 'Repair the broken client',
                                    link: '/introduction/hypermedia-in-action/v2/repair-the-broken-client'
                                },
                                {
                                    text: 'Architecture and protocol review',
                                    link: '/introduction/hypermedia-in-action/v2/architecture-and-protocol'
                                }
                            ]
                        },
                        {
                            text: 'Observations of the demo',
                            link: '/introduction/hypermedia-in-action/observations-of-the-demo'
                        }
                    ]
                },
                {
                    text: 'Hypermedia quickstart',
                    link: '/introduction/quickstart'
                }
            ]
        }
    ]
}