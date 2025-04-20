# Client code review
Both `alice` and `bob` have almost identical code.  The key differences are how determine the URLs when they make API requests.

The files for each client are as follows:

| File             | Description                                                                     |
|------------------|---------------------------------------------------------------------------------|
| meeting_buddy.py | This defines the `main()` function which is the entry point of the application. |
| config.py        | Sets the constant(s) needed for the client to operate.                          |
| api.py           | Defines the `Api` class which provides functions to make using the API easier.  |
| venue.py         | Defines the `Venue` class                                                       |
| event.py         | Defines the `Event` class                                                       |
| console.py       | Defines the `Console` class, which provides functions to control the console/UI |
| utils.py         | Defines any helper functions (currently only `format_duration()`                |

The bulk of the client's behaviour is defined in `event.py` and `venue.py`

<centered-image src="/img/meeting-buddy-classes.svg" rounded />

:::tip Note
The functions stereotyped as `<<api>>` are the functions that send requests to the backend.
:::

## A closer look at Bob
:::tip Note
To open the `bob` client in VSCode, in the `clients/bob/` folder type:
```bash
code .
```
:::

As you recall, `bob` is a client that uses the "memorize endpoints" approach to API integration.  In the run-through above, we used `bob` to list the attendees of the Daily Standup scheduled in the Developer Meeting Room.  What does `bob` need to know in order to perform this?  We know that all data and functionality are in the one service component.  So `bob` needs to know:

* the base URL for that service component
* the path to append to the base URL to GET venues
* how to construct the URL to GET the events for a venue
* how to construct the URL to GET the registrations for an event

In short, `bob` must know all the URLs required to operate the service (or how to build each URL).  The `bob` development team will typically look to service documentation to find all the endpoints, e.g. from a Swagger generated page.

The value of the base URL is set in `config.py`

```python
# config.py (bob)
BASE_API_URL = 'http://localhost:2112'
```

The other items in the above list are hard-coded within the functions where the GET requests are made.  For example `venue.select_venues()` is where the client sends the GET request for the list of venues:

```python
# venue.py (bob)
@staticmethod
def select_venue():
    url = url_join(BASE_API_URL, '/venues')
    result = requests.get(url, headers=Api.get_headers())
    ...
    ...
```

To create the URL to GET the events for a venue, see `venue.get_events()`:

```python
# venue.py (bob)
def get_events(self):
    url = url_join(BASE_API_URL, f'/venues/{self["_id"]}/events')
    result = requests.get(url, Api.get_headers())
    ...
    ...
```

This will be a familiar pattern to many of you.

## A closer look at Alice
:::tip Note
To open the `alice` client in VSCode, in the `clients/alice/` folder type:
```bash
code .
```
:::

Unlike `bob`, `alice` only knows about one URL - the URL for the service itself.  From this one URL, `alice` relies on the service to provide all the others.  So `alice` needs to know:

* the URL of the API
* the link relations (i.e. labels) that connect one resource to other resources, or to operations for that resource.
    * to find the venues related to a resource, `alice` looks for a link relation named `venues`
    * to find the events related to a resource, `alice` looks for a link relation named `events`

The `alice` development team can read about the list of link relations from the service documentation, and/or by exploring the API itself (e.g. in Postman).

Let's compare the code from the `alice` client to the same code we looked at so far in `bob`:

The `config.py` file for `alice` is the same:

```python
# config.py (alice)
BASE_API_URL = 'http://localhost:2112'
```

The `alice` client adds a couple of methods to the `Api` class.

```python{3,12}
# api.py (alice)
@classmethod
def get_root_resource(cls):
    if cls._root_resource:
        return cls._root_resource

    result = requests.get(BASE_API_URL, headers=cls.get_headers())
    cls._root_resource = result.json()
    return cls._root_resource

@staticmethod
def url_from_resource(resource, rel):
    href = resource['_links'][rel]['href']
    url = href
    if href.startswith('/'):
        url = Api.url_join(BASE_API_URL, href)
    return url
```

The `get_root_resource()` method is the only time `alice` uses its knowledge of the API's URL.  It does this to get the root resource (see [GET the root resource with Postman](explore-with-postman.html#get-the-root-resource))

So how does `alice` get the list of venues?  The same as `bob` does, except for how it determines the URL of the GET request.  In `venue.select_venues()`, it looks like this:

```python{5}
# venue.py (alice)
@staticmethod
def select_venue():
    root = Api.get_root_resource()
    url = Api.url_from_resource(root, 'venue')
    result = requests.get(url, headers=Api.get_headers())
    ...
    ...
```
First `alice` gets the root resource.  It will use this to find where the venues are located. Here is the relevant snippet from the root resource JSON:

```json{5}
{
    "_links": {
        ...
        ...
        "venue": {
            "href": "/venues"
        },
        ...
        ...
    }
}
```

Next `alice` uses `url_from_resources()` to look up the `href` in the resource's `_links` object having a link relation of `venue`.  This translates to, "From the root resource, follow the link named 'venues' and send a GET request"

Once the user has selected a venue, `alice` needs that venue's events.  To create the URL to GET the events for a venue, see `venue.get_events()`:

```python
# venue.py (alice)
def get_events(self):
    url = Api.url_from_resource(self, 'event')
    result = requests.get(url, headers=Api.get_headers())
    ...
    ...
```
In other words: follow this venue (`self`) to its events and send a GET request.  On my machine, the JSON for the venue in question was as follows (your `_id`, `_etag` and dates will be different):

```json{17}
{
    "_id": "680529bf1c7f4a575422bf37",
    "name": "Developer Meeting Room",
    "capacity": 5,
    "description": null,
    "_updated": "2025-04-20T17:07:11",
    "_created": "2025-04-20T17:07:11",
    "_etag": "a7b02f1201cf9e1f40ce1768009956420871d045",
    "_links": {
        "self": {
            "href": "/venues/680529bf1c7f4a575422bf37"
        },
        "parent": {
            "href": "/venues"
        },
        "collection": {
            "href": "/venues"
        },
        "edit-form": {
            "href": "/venues/680529bf1c7f4a575422bf37/edit-form",
            "_note": "GET to fetch edit-form"
        },
        "event": {
            "href": "/venues/680529bf1c7f4a575422bf37/events"
        }
    }
}
```
Compare this to the `bob` version:

```python{3}
# venue.py (bob)
def get_events(self):
    url = url_join(BASE_API_URL, f'/venues/{self["_id"]}/events')
    result = requests.get(url, Api.get_headers())
    ...
    ...
```

The `bob` client had to construct the URL that was there in the `_links` all along. Instead of constructing the URL, `alice` blindly follows the `href` for the `event` link relation.

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
