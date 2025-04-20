# Explore the API with Postman

This is an optional step.  It will help you better visualize what the clients are doing.

[Click here to skip this step](run-the-clients). 

## Configure Postman

When Postman GETs hypermedia, you can click on the links to open a new request tab.  Because the Event Buddy service has authentication, you must supply an `Authorization:` header for requests to be successful.  It is a pain having to set this header for each request tab.  Postman has a setting that makes this easier.

In the Postman menu: File->Settings->General, enable "Retain headers when clicking on links".

<centered-image src="/img/postman-retain-headers.png" round/>

Now we can set the `Authorization:` header for our first GET request, and the header will follow with each link we click.

## GET the root resource
In a request tab:
* select GET
* enter the url: `http://localhost:2112`
* click the request Headers and add this header:
    * Key: &nbsp;&nbsp; `Authorization`
    * Value: `Basic cm9vdDpwYXNzd29yZA==`
* click Send

<centered-image src="/img/postman-authorization-header.png" round />

This will produce a JSON response (HAL actually) like this:

```json
{
    "_links": {
        "self": {
            "href": "/",
            "_note": "Home resource for event-buddy"
        },
        "event": {
            "href": "/events",
            "_note": "add ?links_only query string to GET _links without the collection"
        },
        "account": {
            "href": "/accounts",
            "_note": "add ?links_only query string to GET _links without the collection"
        },
        "venue": {
            "href": "/venues",
            "_note": "add ?links_only query string to GET _links without the collection"
        },
        "registration": {
            "href": "/registrations",
            "_note": "add ?links_only query string to GET _links without the collection"
        },
        "logging": {
            "href": "/_logging",
            "_note": "logging verbosity: GET, PUT"
        },
        "settings": {
            "href": "/_settings",
            "_note": "versions and settings: GET"
        }
    }
}
```
This is the root resource.  As is typical for this type of API, it has no data - only links.

## Follow the links
Hover over each of the `href` values.  You will see Postman recognizes them as links.

:::info Note
Links are labeled by "link relations", e.g. `venue`, `event`, `account`, `registration`.  Link rels are singular by convention.  To a hypermedia client the link rels are important, not the `href`.  The `href` can be anything - clients just follow it.  To conform with normal URL design, the URL path to resources are plural.

This is only confusing if you look at the href as if it has meaning. To a hypermedia client, it is just a string to plug into the http library.  The `href` can change (as we will see) but the link rel does not.
:::

Click on `/venues`.  Postman opens a new tab to GET that URL.  Click "Send" to see the venues related to the root resource.

This is a classic hypermedia response.  It has the data you requested (the list of venues in an array in `_embedded`, labelled `venue`).  Each venue has links (in an object named `_links`).

In the first venue's `_links`, find the link labelled `event`.  Click on that `href` value to GET the events related to that venue.

Feel free to explore as you see fit.

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
