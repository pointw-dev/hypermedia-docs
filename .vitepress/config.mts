import {defineConfig, withBase} from 'vitepress'
import {fileURLToPath, URL} from 'node:url'


const basePath = 'hypermedia-docs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'hypermedia',
    description: 'Resilient API design using the power of the Web ',

    themeConfig: {
        siteTitle: 'hypermedia',
        stackOverflowTags: ['hypermedia', 'rest', 'api'],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/pointw-dev/hypermea'}
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
        ['link', {rel: 'icon', href: `/${basePath}/favicon.ico`}]
    ],
    srcDir: 'src',
    vite: {
        resolve: {
            alias: [
                {
                    find: /^.*\/VPFeature\.vue$/,
                    replacement: fileURLToPath(new URL('./components/VPFeature.vue', import.meta.url))
                }
            ]
        }
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