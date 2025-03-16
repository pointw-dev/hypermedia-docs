# Explore the API with Postman

This is an optional step.  It will help you better visualize what the clients are doing.

[Click here to skip this step](run-the-clients). 

## Configure Postman

(if you did this when exploring v1, you can [skip this configuration](#get-the-root-resource))

When Postman GETs hypermedia, you can click on the links to open a new request tab.  Because the Event Buddy service has authentication, you must supply an `Authorization:` header for requests to be successful.  It is a pain having to set this header for each request tab.  Postman has a setting that makes this easier.

In the Postman menu: File->Settings->General, enable "Retain headers when clicking on links".

<centered-image src="/img/postman-retain-headers.png" round/>

Now we can set the `Authorization:` header for our first GET request, and the header will follow with each link we click.

## GET the root resource
In a request tab:
* select GET
* enter the url: `http://localhost:2112`
* click the request Headers and add this header (if it's not already there from last time):
    * Key: &nbsp;&nbsp; `Authorization`
    * Value: `Basic cm9vdDpwYXNzd29yZA==`
* click Send

<centered-image src="/img/postman-authorization-header.png" round />

This will produce a JSON response (HAL actually), which will be different from the time we did this using Event Buddy v1:

```json{11,23,35,47}
{
    "_links": {
        "venues-service:logging": {
            "href": "http://192.168.1.94:2113/_logging",
            "title": "logging"
        },
        "venues-service:settings": {
            "href": "http://192.168.1.94:2113/_settings",
            "title": "_settings"
        },
        "venues": {
            "href": "http://192.168.1.94:2113/venues",
            "title": "venues"
        },
        "accounts-service:logging": {
            "href": "http://192.168.1.94:2116/_logging",
            "title": "logging"
        },
        "accounts-service:settings": {
            "href": "http://192.168.1.94:2116/_settings",
            "title": "_settings"
        },
        "accounts": {
            "href": "http://192.168.1.94:2116/accounts",
            "title": "accounts"
        },
        "registrations-service:logging": {
            "href": "http://192.168.1.94:2114/_logging",
            "title": "logging"
        },
        "registrations-service:settings": {
            "href": "http://192.168.1.94:2114/_settings",
            "title": "_settings"
        },
        "registrations": {
            "href": "http://192.168.1.94:2114/registrations",
            "title": "registrations"
        },
        "events-service:logging": {
            "href": "http://192.168.1.94:2115/_logging",
            "title": "logging"
        },
        "events-service:settings": {
            "href": "http://192.168.1.94:2115/_settings",
            "title": "_settings"
        },
        "events": {
            "href": "http://192.168.1.94:2115/events",
            "title": "events"
        },
        "self": {
            "href": "http://localhost:2112/",
            "title": "hypermea-gateway root"
        },
        "logging": {
            "href": "http://localhost:2112/_logging",
            "title": "logging"
        },
        "settings": {
            "href": "http://localhost:2112/_settings",
            "title": "_settings"
        },
        "gateway_registrations": {
            "href": "http://localhost:2112/gateway_registrations",
            "title": "gateway_registrations"
        },
        "curies": [
            ...
            ...
        ]
    },
    "_etag": "39d2a88aae49af7887255e753318c302"
}
```
As before, this is the root resource: no data, only links. It different from what we saw in v1, but all the link relations from v1 are here (along with a bunch of new ones we'll ignore, including the `curies` thing).

## Follow the links
Hover over each of the `href` values.  You will see Postman recognizes them as links.

This time, the value of `href` for the `venues` link is `http://192.168.1.94:2113/venues` (on my machine - your IP address will likely be different).  Look at the value of `href` for `events`:  its under a different domain!

And yet, when a client follows the links by looking up the label (i.e. link relation), the client doesn't notice or care about these differences.

Try it by clicking on the `href` value for `venues`.  As before Postman opens a new tab to GET that URL.  Click "Send" to see the venues related to the root resource.  Even though venues are now served by a different component at a different location, the same operation continues to produce the same results.

In the first venue's `_links`, find the link labelled `events`.  Click on that `href` value to GET the events related to that venue, again - exactly as we did before.  Only the `href` values are different.

Feel free to explore as you see fit.

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
