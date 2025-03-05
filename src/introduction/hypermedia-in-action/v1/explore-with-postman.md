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
            "title": "event-buddy root"
        },
        "logging": {
            "href": "/_logging",
            "title": "logging"
        },
        "settings": {
            "href": "/_settings",
            "title": "_settings"
        },
        "events": {
            "href": "/events",
            "title": "events"
        },
        "venues": {
            "href": "/venues",
            "title": "venues"
        },
        "registrations": {
            "href": "/registrations",
            "title": "registrations"
        },
        "accounts": {
            "href": "/accounts",
            "title": "accounts"
        }
    }
}
```
This is the root resource.  As is typical for this type of API, it has no data - only links.

## Follow the links
Hover over each of the `href` values.  You will see Postman recognizes them as links.

Click on `/venues`.  Postman opens a new tab to GET that URL.  Click "Send" to see the venues related to the root resource.

This is a classic hypermedia response.  It has the data you requested (the list of venues in an array named `_items`) and it has links (in an object named `_links`).

In the first venue's `_links`, find the link labelled `events`.  Click on that `href` value to GET the events related to that venue.

Feel free to explore as you see fit.
