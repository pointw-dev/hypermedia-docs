# Repair the broken client

To get `bob` working again we could, of course, use the hypermedia approach.  However, in this demo we will continue with the "memorize endpoints" approach. 

## Planning the work
The problem, of course, is all resources used to be located under a single `BASE_API_URL`, which was configured in `config.py`.  They have all been relocated so we will need to update that file.

Let's look again at the client class diagram:

<centered-image src="/img/meeting-buddy-classes.svg" rounded />

Each of the `<<api>>` stereotyped methods are subject to change.  

So we will change these files/methods, in this order:
* `config.py`
* `venue.py`
  * `select_venue()`
  * `get_events()`
  * `add_event()`
* `event.py`
  * `view_attendees()`
  * `register()`


## config.py
Looking at the v2 `docker-compose.yml` we see that the new single-resource components are found in the following locations:

```yaml
name: event-buddy

services:
  venues-service:
    ...  
      HY_BASE_URL: http://$IP_ADDRESS:2113
    ...
      
  registrations-service:
    ...
      HY_BASE_URL: http://$IP_ADDRESS:2114
    ...
      
  events-service:
    ...
      HY_BASE_URL: http://$IP_ADDRESS:2115
    ...

  accounts-service:
    ...
      HY_BASE_URL: http://$IP_ADDRESS:2116
    ...
```

To find the value of `$IP_ADDRESS`, change into `/server/v2/` then:

```bash
cat .env
# Windows: type .env
```

On my machine I see the following:
```text
IP_ADDRESS=192.168.1.94
```

We will use the above to modify the `config.py` file.

```python
# config.py
VENUES_BASE_API_URL = 'http://192.168.1.94:2113'
REGISTRATIONS_BASE_API_URL = 'http://192.168.1.94:2114'
EVENTS_BASE_API_URL = 'http://192.168.1.94:2115'
ACCOUNTS_BASE_API_URL = 'http://192.168.1.94:2116'
```

:::tip Note
You can also use `localhost` instead of IP for `bob-v2`.  The `docker-compose.yml` needs IP addresses because in order for the components to maintain their relationships with each other, they need URLs that resolve to the other components' services.  A component, running inside a docker container, will resolve `localhost` to itself - breaking the domain model.
:::



## venue.py - select_venue()

```python{2,7}
# venue.py
from config import BASE_URL_API
...
...
@staticmethod
def select_venue():
    url = Api.url_join(BASE_API_URL, '/venues')
    result = requests.get(url, headers=Api.get_headers())
```

This is a simple fix.  The `BASE_API_URL` is currently configured to point at what is now the Gateway (`http://localhost:2112`).  We need to replace that with `VENUES_BASE_API_URL`.

```python{2,7}
# venue.py
from config import VENUES_BASE_API_URL
...
...
@staticmethod
def select_venue():
    url = Api.url_join(VENUES_BASE_API_URL, '/venues')
    result = requests.get(url, headers=Api.get_headers())
```

## venue.py - get_events()

This fix is a bit more challenging.

```python{2,6}
# venue.py
from config import VENUES_BASE_API_URL
...
...
def get_events(self):
    url = Api.url_join(BASE_API_URL, f'/venues/{self["_id"]}/events')
    result = requests.get(url, headers=Api.get_headers())
```

Put your backend developer hat on for a moment.

When all resources were served by the same component:
* to GET all venues, the path is `/venues`
* to GET a single venue, the path is `/venues/{venue_id}`
* so it made sense if you want to GET the events for a venue, the path should be `/venues/{venue_id}/events`

However, events are now served by the `events-service` component.  The above logic no longer applies (what does GET `/venues` mean from the `events-service` point of view?)  

So the backend team created this route: `/events/venue/{venue_id}` i.e. GET the events for venue ID.

This means the above needs to become:
```python{2,6}
# venue.py
from config import VENUES_BASE_API_URL, EVENTS_BASE_API_URL
...
...
def get_events(self):
    url = Api.url_join(EVENTS_BASE_API_URL, f'/events/venue/{self["_id"]}')
    result = requests.get(url, headers=Api.get_headers())
```

:::info Side note
> Even the assumption that `_id` is part of a URL is subject to future change.  You will recognize the IDs used in Event Buddy as ObjectIDs from MongoDB.  We had a backend that served vehicle data.  The initial version of that service used ObjectIDs in a similar fashion to Event Buddy.  URLs contained a vehicle's `_id`.  
> 
> A request was made by the BI team, who were analyzing server logs.  Server logs are full of data like `GET /vehicles/67c761f3ed56f8e9e1210b9f`  They wanted to harvest this information and correlate to vehicle VINs.
> 
> It was easy to change `_id` to `vin` in constructing these URLs because our hypermedia aware clients didn't care how URLs were constructed.  Now server logs are full of data like this instead: `GET /vehicles/SCA1S684X4UX07444` i.e. the vehicle VIN instead of a random generated ID.
:::

## venue.py - add_event()

This change is identical to the previous - it uses the same resource with a POST instead of a GET.

```python{7}
# venue.py
from config import VENUES_BASE_URL_API, EVENTS_BASE_URL_API
...
...
def add_event(self, event_data):
    data = json.dumps(event_data)
    url = Api.url_join(BASE_API_URL, f'/venues/{self["_id"]}/events')
    result = requests.post(url, data=data, headers=Api.get_headers())
```

becomes

```python{7}
# venue.py
from config import VENUES_BASE_URL_API, EVENTS_BASE_URL_API
...
...
def add_event(self, event_data):
    data = json.dumps(event_data)
    url = Api.url_join(EVENTS_BASE_API_URL, f'/events/venue/{self["_id"]}')
    result = requests.post(url, data=data, headers=Api.get_headers())
```

## event.py - view_attendees()

This change is similar to the last couple of changes:

```python{2,6}
# venue.py
from config import BASE_URL_API
...
...
def view_attendees(self):
    url = Api.url_join(BASE_API_URL, f'/events/{self["_id"]}/registrations')
```

Registrations have moved, with similar change to the path URL design as we saw with events/venues.

So the above becomes GET registrations for event ID:

```python{2,6}
# venue.py
from config import REGISTRATIONS_BASE_API_URL
...
...
def view_attendees(self):
    url = Api.url_join(REGISTRATIONS_BASE_API_URL, f'/registrations/event/{self["_id"]}')
```

## event.py - register()

Finally, although we haven't yet seen event registration in action, we can see what needs to change here:

```python{2,7}
# venue.py
from config import REGISTRATIONS_BASE_URL_API
...
...
def register(self, username=None):
    user_spec = json.dumps({'username': username}) if username else {}
    url = Api.url_join(BASE_API_URL, f'/events/{self["_id"]}/register')
```

Without going into details, the above becomes:

```python{2,7}
# venue.py
from config import REGISTRATIONS_BASE_API_URL, EVENTS_BASE_API_URL
...
...
def register(self, username=None):
    user_spec = json.dumps({'username': username}) if username else {}
    url = Api.url_join(EVENTS_BASE_API_URL, f'/events/{self["_id"]}/register')
```

::: info Note
As mentioned before, we will look at registering to attend an event in a future discussion.
:::

That completes all the changes - until the backend team gets some more ideas. 

## bob-v2
If you were not following along making the changes to the `bob` client, you can still give `bob-v2` a try.

All of the above changes can be found in the `clients/bob-v2` folder.  With Event Buddy v2 running, it will work as expected - but will fail if v1 is running.

As we have seen, `alice` works with both versions - and versions yet to come.

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
