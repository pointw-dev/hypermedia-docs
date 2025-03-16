---
layout: doc

prev:
  text: 'What is hypermedia?'
  link: '/introduction/what-is'

next:
  text: 'Set up the demo'
  link: '/introduction/hypermedia-in-action/setup-the-demo'
---

# Hypermedia in action

In the last page we discussed the idea of how hypermedia protects from client coupling. Here we will look at a concrete example. The purpose of this page is to demonstrate _in your hands_ the decoupling power of hypermedia. This will be both runtime review and code review.

We will look at an initial implementation of a backend as well as two clients that use it. One client (`alice`) will make use of hypermedia and the other client (`bob`) will follow the typical approach of configuring multiple endpoints.  Then we will change the backend architecture and see the effect on the two clients.

## Introducing Event Buddy
The backend implements the Event Buddy service. It is used to create venues, schedule events at these venues, and allow members to register to attend events.

<centered-image src="/img/event-buddy-domain.svg" width="600" rounded>The Event Buddy domain</centered-image>

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
