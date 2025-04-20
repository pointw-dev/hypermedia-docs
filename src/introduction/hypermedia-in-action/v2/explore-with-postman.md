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
        "registration-service:logging": {
            "href": "http://192.168.1.94:2114/_logging",
            "_note": "logging verbosity: GET, PUT"
        },
        "registration-service:settings": {
            "href": "http://192.168.1.94:2114/_settings",
            "_note": "versions and settings: GET"
        },
        "registration": {
            "href": "http://192.168.1.94:2114/registrations",
            "_note": "add ?links_only query string to GET _links without the collection"
        },
        "event-service:logging": {
            "href": "http://192.168.1.94:2115/_logging",
            "_note": "logging verbosity: GET, PUT"
        },
        "event-service:settings": {
            "href": "http://192.168.1.94:2115/_settings",
            "_note": "versions and settings: GET"
        },
        "event": {
            "href": "http://192.168.1.94:2115/events",
            "_note": "add ?links_only query string to GET _links without the collection"
        },
        "account-service:logging": {
            "href": "http://192.168.1.94:2116/_logging",
            "_note": "logging verbosity: GET, PUT"
        },
        "account-service:settings": {
            "href": "http://192.168.1.94:2116/_settings",
            "_note": "versions and settings: GET"
        },
        "account": {
            "href": "http://192.168.1.94:2116/accounts",
            "_note": "add ?links_only query string to GET _links without the collection"
        },
        "venue-service:logging": {
            "href": "http://192.168.1.94:2113/_logging",
            "_note": "logging verbosity: GET, PUT"
        },
        "venue-service:settings": {
            "href": "http://192.168.1.94:2113/_settings",
            "_note": "versions and settings: GET"
        },
        "venue": {
            "href": "http://192.168.1.94:2113/venues",
            "_note": "add ?links_only query string to GET _links without the collection"
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
            {
                "name": "registration-service",
                "href": "uri://event-buddy.pointw.com/registration-service/relations/{rel}",
                "templated": true
            },
            {
                "name": "event-service",
                "href": "uri://event-buddy.pointw.com/event-service/relations/{rel}",
                "templated": true
            },
            {
                "name": "account-service",
                "href": "uri://event-buddy.pointw.com/account-service/relations/{rel}",
                "templated": true
            },
            {
                "name": "venue-service",
                "href": "uri://event-buddy.pointw.com/venue-service/relations/{rel}",
                "templated": true
            }
        ]
    },
    "_etag": "85e878fb634a796d4dddea4ef06f52ff"
}
```
As before, this is the root resource: no data, only links. It different from what we saw in v1, but all the link relations from v1 are here (along with a bunch of new ones we'll ignore, including the `curies` thing).

## Follow the links
Hover over each of the `href` values.  You will see Postman recognizes them as links.

This time, the value of `href` for the `venue` link is `http://192.168.1.94:2113/venues` (on my machine - your IP address will likely be different).  Look at the value of `href` for `event`:  its under a different domain!

And yet, when a client follows the links by looking up the label (i.e. link relation), the client doesn't notice or care about these differences.

Try it by clicking on the `href` value for `venue` link.  As before Postman opens a new tab to GET that URL.  Click "Send" to see the venues related to the root resource.  Even though venues are now served by a different component at a different location, the same operation continues to produce the same results.

In the first venue's `_links`, find the link labelled `event`.  Click on that `href` value to GET the events related to that venue, again - exactly as we did before.  Only the `href` values are different.

Feel free to explore as you see fit.

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
