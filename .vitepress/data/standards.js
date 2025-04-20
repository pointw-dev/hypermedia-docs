export const standards = {
    iso: {
        '8601': {
            title: 'Date and time format',
            description: 'A way of presenting dates and times that is clearly defined and understandable to both people and machines.'
        }
    },
    rfc: {
        '3986': {
            title: 'URI - Uniform Resource Identifier',
            description: 'Defines the syntax and components of URIs, including scheme, authority, path, query, and fragment.'
        },
        '6570': {
            title: 'URI Template',
            description: 'Describes a mechanism for describing URIs using templates with variables.'
        },
        '7230': {
            title: 'HTTP/1.1 Message Syntax and Routing',
            description: 'Describes the syntax and parsing of HTTP messages (superseded by RFC 9112).'
        },
        '7231': {
            title: 'HTTP/1.1 Semantics and Content',
            description: 'Defines HTTP methods, status codes, headers, and content negotiation (superseded by RFC 9110).'
        },
        '8288': {
            title: 'Web Linking',
            description: 'Defines a framework for typed links between resources, including the `Link` header field in HTTP.'
        },
        '7807': {
            title: 'Problem Details for HTTP APIs',
            description: 'Standard format for error responses in HTTP APIs using the `application/problem+json` media type.'
        },
        '5988': {
            title: 'Web Linking (Obsolete)',
            description: 'Earlier version of Web Linking.',
            obsoletedBy: '8288'
        },
        '7396': {
            title: 'JSON Merge Patch',
            description: 'Describes a simple format for expressing changes to a JSON document.'
        },
        '9205': {
            title: 'Ambiguity of "message/http" Media Type',
            description: 'Clarifies issues around the "message/http" media type.'
        },
        '9110': {
            title: 'HTTP Semantics',
            description: 'Updated specification for HTTP semantics including methods, status codes, and headers.'
        },
        '9111': {
            title: 'HTTP Caching',
            description: 'Defines rules for HTTP caching, including `Cache-Control`, `ETag`, and `Last-Modified`.'
        },
        '9112': {
            title: 'HTTP/1.1',
            description: 'Updated syntax and routing rules for HTTP/1.1, replacing RFC 7230.'
        },
        '9209': {
            title: 'Deprecation Header Field',
            description: 'Introduces a new HTTP header field indicating that a resource is deprecated.',
        },

        'draft-nottingham-rfc7320bis': {
            title: 'The "Well-Known" URI Registry (bis)',
            description: 'An update to RFC 5785 defining a registry for well-known URIs like /.well-known/.',
            draft: true
        },
        'draft-nottingham-http-link-hints': {
            title: 'HTTP Link Hints',
            description: 'Extends Web Linking with hints about how clients can interact with linked resources.',
            draft: true
        },
        'draft-nottingham-hyperapi': {
            title: 'A Registry for Hypermedia Types',
            description: 'Proposes a registry and guidance for defining hypermedia-driven APIs.',
            draft: true
        },
        'draft-nottingham-avoiding-infinite-loops': {
            title: 'Avoiding Infinite Loops in HTTP APIs',
            description: 'Discusses strategies for avoiding infinite loops in client-side link traversal.',
            draft: true
        },
        'draft-kelly-json-hal': {
            title: 'HAL - The JSON Hypertext Application Language',
            description: 'Defines a simple format for representing hypermedia links in JSON. HAL uses `_links` and `_embedded` to express resource relationships and affordances.',
            draft: true
        }
    }

}