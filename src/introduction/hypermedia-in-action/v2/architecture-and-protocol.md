# Architecture and protocol review

## Architecture (v2)
After changing the `bob` client, our system architecture looks like this:

<centered-image src="/img/event-buddy-v2-full.png" rounded />

* The backend architecture changed from a single component to a cluster of 5 components.
* Each component is hosted at a different base URL.  
* Despite the changes, the backend still delivers the identical resource and their relationships
  <centered-image src="/img/event-buddy-domain.svg" rounded />
* The `bob` client's knowledge of the original URL structure caused it to no longer function after the backend changes
  * i.e. `bob` was bound to the service architecture, which has a high likelihood of change
* The `alice` client continued to operate the same as if nothing happened
  * - i.e. `alice` was bound to the domain model, which maps to business entities.  As long as the business does the same business, the domain model is far less likely to change.

## Protocol
Looking only at the scripted steps the prior sections walked you through, the protocol between client and service can be shown as this:

<centered-image src="/img/event-buddy-protocol.svg" rounded />

:::tip Note
Even though the backend architecture changed, the protocol, which is based on the domain model, can be delivered in the same fashion
:::

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
