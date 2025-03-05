# Architecture and protocol review

Now that you've seen the system in action, let's review and visualize the architecture and the protocol that the clients and service followed when performing those tasks.

<centered-image src="/img/protocol-droid.png" width="400" rounded>I suppose you're programmed for architecture and protocol.</centered-image>

:::tip Note
To keeps things simple I've only mentioned paths and relations that the client used in the steps you took under [Run the clients](run-the-clients).  There are more paths and relations offered by the service.
:::

## Architecture (v1)

<centered-image src="/img/event-buddy-v1-full.png" rounded />

* The backend architecture for Event Buddy v1 is a single component.
* The component is hosted at `http://localhost:2112`.  
* The whole URL space is within that domain
  * i.e. all resource URLs begin with `http://localhost:2112`
  <centered-image src="/img/event-buddy-domain.svg" rounded />
* The `bob` client uses knowledge of the URL structure when building paths
  * including when relating one resource to another (`/parent/{parent_id/child`, e.g. `/venues/{venue_id}/events`)
  * It also knows which field in a resource is used as the ID when constructing these paths
* The `alice` client is configured only with the knowledge of the single URL, and the link relations it will need.

## Protocol
Looking only at the scripted steps the prior sections walked you through, the protocol between client and service can be shown as this:

<centered-image src="/img/event-buddy-protocol.svg" rounded />

:::tip Note
References to code in the following are pseudocode for brevity.
:::

| Step | Description                                                                                                                                                                                                                                                                                                                 |
|:----:|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  1   | You started the client application by running `meeting_buddy.py`                                                                                                                                                                                                                                                            |
|  2   | Client sent a GET request for the root resource.<br/>**alice** only<br/>&nbsp;&nbsp;`root = Api.get_root_resource()`                                                                                                                                                                                                        |
|  3   | Client sent a GET request for all venues, calling the static method `Venue.select_venue()`<br/>**alice**:<br/>&nbsp;&nbsp;`url = Api.url_from_resource(root, 'venues')->GET`<br/>**bob**:<br/>&nbsp;&nbsp;`url = Api.url_join(BASE_API_URL, '/venues')->GET`                                                                |
|  4   | Client now has an array of venues in memory, and uses it to display a menu for you to choose from.                                                                                                                                                                                                                          |
|  5   | You selected the first venue.  The client indexes the array, referencing the `venue` you chose.                                                                                                                                                                                                                             |
|  6   | Client sends a GET request for all events that belong to that venue by calling `venue.get_events()`.<br/>**alice**:<br/>&nbsp;&nbsp;`url = Api.url_from_resource(venue, 'events')->GET`<br/>**bob**:<br/>&nbsp;&nbsp;`url = Api.url_join(BASE_API_URL, f'/venues/{venuef["_id"]}/events')->GET`                             |
|  7   | Client now has an array of events in memory, and uses it to display a menu for you to choose from.                                                                                                                                                                                                                          |
|  8   | You selected `V` for View, then chose the first event.  The client indexes the array, referencing the `event` you chose.                                                                                                                                                                                                    |
|  9   | Client called `event.view_attendees()`<br/>**alice**:<br/>&nbsp;&nbsp;`url = Api.url_from_resource(event, 'registrations')->GET`<br/>**bob**:<br/>&nbsp;&nbsp;`url = Api.url_join(BASE_API_URL, f'/events/{event["_id"]}/registrations')->GET`                                                                              |
|  10  | Client now has a list of registrations (with embedded account information) and displays the names of the attendees.                                                                                                                                                                                                         |
|  11  | You entered `A` for Add, then entered the event details.                                                                                                                                                                                                                                                                    |
|  12  | Client tells the venue to send a POST request with its body containing the event details: `venue.add_event(event)`.<br/>**alice**:<br/>&nbsp;&nbsp;`url = Api.url_from_resource(venue, 'events')->POST event`<br/>**bob**:<br/>&nbsp;&nbsp;`url = Api.url_join(BASE_API_URL, f'/venues/{venue["_id"]}/events')->POST event` |
