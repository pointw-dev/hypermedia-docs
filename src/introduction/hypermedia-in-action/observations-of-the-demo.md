# Observations of the demo

The de-coupling power of the hypermedia approach is clear:
* When both client and backend follow the hypermedia approach, the backend architecture can change without also having to release a new version of the client.
* `bob` is a console application.  What if we also had a web application as a client, a mobile app, some B2B integrations?
    * We would have to roll out new versions of each of these clients.
    * To avoid such expensive client rollouts, teams will often run multiple versions of the APIs so old clients can use keep using v1 and newer clients can use v2.
    * Some teams even include `v1` in the initial release, anticipating there will be a `v2`
* By following the hypermedia approach APIs can evolve without versioning.

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
