---
layout: doc
footer: true
---

# What is hypermedia?

Hypermedia is a way to approach the API design of your distributed services architecture. It helps solve the problem of client coupling.  It has other benefits too, which I will elaborate in another section. Coupling is bad because when things change (and they always do) it risks broken clients and costly version rollouts.

<centered-image src="/img/decoupling.png" width="400" rounded>Train cars do not assume what is in the other car.</centered-image>

Hypermedia decreases coupling by addressing what the client needs to know in advance - and importantly what it **doesn't** need to know - in order to use your services. Instead of hard-wiring assumptions about the backend structure, the client focuses on what it needs to accomplish. The server is responsible for providing the client an easy-to-follow map of the available data and capabilities. The client knows **what** to ask for. The server knows **how** to respond to those requests, and guides the client to next steps.

The key is to commit to this approach. It means designing APIs where the client doesn't need to know how server-side components are structured, e.g. their locations. A client instead relies on the guidance provided within each response. The server doesn't just return data; it also provides the 'map' - links and affordances that show the client what actions are possible next. This allows clients to adapt seamlessly to changes in the server, reducing the risk of breakage and eliminating the need for rigid, hardcoded service descriptions. 

Both server and client have a job to do.  The server provides **hypermedia**, that is "data with links".  The client follows the **hypermedia** links to find its way through the URL space.

## Hypermedia reduces coupling
### Service descriptions

SOAP fell out of favour, in part, because of its brittle bindings to WSDL (web _service description_ language). Clients
were tightly coupled to these descriptions. Making the slightest backend change invalidated the service description
existing clients relied on, thus breaking those clients. The coupling in the case of SOAP was obvious, and we moved away
from it. 

<centered-image src="/img/soap.jpg" width="400" rounded>Not as clean as we wanted</centered-image>

But take a look at a typical client's configuration file today.

```python
AUTH_SERVICE_URL = 'https://auth.example.com/login'
USER_PROFILE_URL = 'https://users.api.internal.company.net/profiles'
PAYMENTS_API_URL = 'https://payments.finance-platform.io/api/'
INVENTORY_SERVICE_URL = 'https://inventory.warehouse-services.com/api/'
ORDERS_SERVICE_URL = 'https://orders.retail-ops.net/orders'
```

It is not as obvious, but this is tight coupling too. Isn't the list of the server-side locations of data and functionality just another way of describing services, i.e., a different form of service description? Further, these URLs often serve as a base for string concatenations to form new URLs, e.g. adding IDs or additional sub-paths.  This hardcodes even more assumptions about the server's architecture. It is less brittle than the service descriptions in SOAP, but can still be improved.

<centered-image src="/img/url-space.webp" width="400" rounded>What does the config file look like for a client using this cluster?</centered-image>


The list of all possible URLs required to use a distributed system is a new form of service description. Backend developers wisely design these URLs to be human-readable for debugging and ease of development. It is unwise, though, to require clients to "know" this URL space in advance. Defining and managing the structure of URLs is the server's domain, and backend developers need the freedom to change these paths at any time without breaking clients. Hypermedia enables this flexibility by allowing the server to provide the necessary 'map' dynamically, guiding clients through available resources without the need for hardcoded endpoints, or string-concatenating URLs.

### Hardcoded endpoints

Alice and Bob go to the supermarket. They each are there for three things: bottled water, rice, vinegar. They each
have a shopping list.

Alice's list looks like this:

::: tip Fresh St. Farms: 123 Main St.
- bottled water
- rice
- vinegar
:::

Bob's list looks like this:

::: tip Fresh St. Farms: 123 Main St.
- Aisle 1, 20 steps, left side, bottom shelf
- Aisle 2, 5 steps, right side, top shelf
- Aisle 3, 30 steps, left side, middle shelf
:::

The problem with memorizing locations is now obvious. Both ~~programs~~ lists contain the location of the store. Bob's also contains the locations of the ~~services~~ items _inside_ the store. He is in trouble when the ~~architecture~~ arrangement of the store changes.  Alice is shielded from such rearrangements. Alice's bindings use the language of the groceries whereas Bob's is based on the current structure of the store.

<centered-image src="/img/grocery-aisles.png" width="600" rounded>Be like Alice</centered-image>
 
Grocery store owners do not worry about moving items around inside the store.  They know no one makes lists like Bob's.  When they do move items, they update the aisle signs.

Your services can provide client developers what they need so they can write programs like Alice's.  Then the backend developers are free to ~~rearrange the store~~ re-architect the server without breaking any clients. 

## Bringing it all together

What is hypermedia?

* Hypermedia is data that includes links.
* Links are labelled with domain-specific language, so clients are indirectly coupled to service architecture.
* A client uses the labels (link relations) to find the link to the data or capability it needs.
* Clients follow the links opaquely, that is without knowledge of how the URL is constructed.
* This lets the server-side alter how it delivers services - the labels to data/capabilities remain the same but locations can change

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
