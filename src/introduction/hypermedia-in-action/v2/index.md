---
prev:
  text: 'Shutting it down'
  link: '/introduction/hypermedia-in-action/v1/shutting-it-down'

next:
  text: 'Explore with Postman'
  link: '/introduction/hypermedia-in-action/v2/explore-with-postman'
---
# Launch Event Buddy v2

Event Buddy v2 came about after a significant re-architecture effort.  Of course, Event Buddy was created for this demo, but the re-architecture described here is inspired by real-life examples I have personally experienced.

## Re-architecting the backend
Here is the motivation for the re-architecture:  the initial decision to have these resources powered by a single component worked well until a drastic upturn in business.  Venues, for example, was intended to represent the meeting places in an office building - until we started attracting hotels, convention centres, and even a theme park.  Registrations were overwhelmed when a new mobile apps which used the system were released.  

### Breaking it all up
Long story short, it was decided to split the single component into four - one component to handle each resource.  Each component in this new set of microservices will have unique and individual deployment profiles (scaling groups, load balancers, multi-regions, etc.).  This means, however, that each resource must be relocated to a different domain - the URLs for everything will change.

### Introducing the gateway
Splitting a single service into four presents a problem of orchestration.  To address this we used the [gateway pattern](https://www.geeksforgeeks.org/api-gateway-patterns-in-microservices/).

In this implementation, the Gateway component receives the root document of each API that registers with it.  When the Gateway receives a request for its root resource, it responds with an aggregation of all root documents it has received.

<centered-image src="/img/gateway-pattern.svg" width="600" rounded />

This works well with the hypermedia approach.  The `pointw/hypermea-gateway` component is very lightweight.  It adds almost no additional processing when clients come calling.  A typical client makes a request for the root resource once. Once the Gateway delivers its aggregated root resource, it is typically never invoked again for the rest of that client's session. 

### Presenting v2
Event Buddy v2 consists of one component to handle each resource, plus a gateway component.

<centered-image src="/img/event-buddy-v2-server-only.png" width="275" rounded />

Each component serves the resource it is responsible for, and maintains relationships with the other components.  Together, these five components faithfully implement the original domain:

<centered-image src="/img/event-buddy-domain.svg" width="500" rounded>The Event Buddy domain</centered-image>

All existing clients that followed the hypermedia approach will be unaware that anything has changed.  We will check in with `alice` and `bob` shortly.

## docker-compose.yml

The `docker-compose.yml` for this version is in the `server/v2` folder.  

Notice it contains a variable `$IP_ADDRESS`

```yaml
name: event-buddy

services:
  venues-service:
    image: pointw/venues-service
    container_name: venues-service
    ports:
      - "2113:80"
    environment:
      AUTH_ADD_BASIC: true
      HY_INSTANCE_NAME: venues-service development container
      HY_MONGO_HOST: demo-mongo
      HY_MONGO_DBNAME: event-buddy
      HY_API_PORT: 80
      HY_CACHE_CONTROL: no-cache, no-store, must-revalidate
      HY_CACHE_EXPIRES: 30
      HY_GATEWAY_URL: http://api-gateway
      HY_BASE_URL: http://$IP_ADDRESS:2113
    depends_on:
      - api-gateway
      - demo-mongo

  registrations-service:
    image: pointw/registrations-service
    container_name: registrations-service
    ports:
      - "2114:80"
    environment:
      AUTH_ADD_BASIC: true
      HY_INSTANCE_NAME: registrations-service development container
      HY_MONGO_HOST: demo-mongo
      HY_MONGO_DBNAME: event-buddy
      HY_API_PORT: 80
      HY_CACHE_CONTROL: no-cache, no-store, must-revalidate
      HY_CACHE_EXPIRES: 30
      HY_GATEWAY_URL: http://api-gateway
      HY_BASE_URL: http://$IP_ADDRESS:2114
    depends_on:
      - api-gateway
      - demo-mongo

  events-service:
    image: pointw/events-service
    container_name: events-service
    ports:
      - "2115:80"
    environment:
      AUTH_ADD_BASIC: true
      HY_INSTANCE_NAME: events-service development container
      HY_MONGO_HOST: demo-mongo
      HY_MONGO_DBNAME: event-buddy
      HY_API_PORT: 80
      HY_CACHE_CONTROL: no-cache, no-store, must-revalidate
      HY_CACHE_EXPIRES: 30
      HY_GATEWAY_URL: http://api-gateway
      HY_BASE_URL: http://$IP_ADDRESS:2115
    depends_on:
      - api-gateway
      - demo-mongo

  accounts-service:
    image: pointw/accounts-service
    container_name: accounts-service
    ports:
      - "2116:80"
    environment:
      AUTH_ADD_BASIC: true
      HY_INSTANCE_NAME: accounts-service development container
      HY_MONGO_HOST: demo-mongo
      HY_MONGO_DBNAME: event-buddy
      HY_API_PORT: 80
      HY_CACHE_CONTROL: no-cache, no-store, must-revalidate
      HY_CACHE_EXPIRES: 30
      HY_GATEWAY_URL: http://api-gateway
      HY_BASE_URL: http://$IP_ADDRESS:2116
    depends_on:
      - api-gateway
      - demo-mongo

  api-gateway:
    image: pointw/hypermea-gateway
    container_name: api-gateway
    ports:
      - "2112:80"
    environment:
      HY_INSTANCE_NAME: api-gateway development container
      HY_MONGO_HOST: demo-mongo
      HY_CACHE_CONTROL: no-cache, no-store, must-revalidate
      HY_CACHE_EXPIRES: 30
      GW_CURIES_NAMESPACE_URI: uri://event-buddy.pointw.com
    depends_on:
      - demo-mongo

  demo-mongo:
    image: mongo
    container_name: demo-mongo
    ports:
      - "27017:27017"
```

## Launch and populate
To launch the services, change into the `server/v2/` folder

Before running `docker compose` please first run this preparation script:

```bash
./before_docker_compose.py
# Windows:  python before_docker_compose.py
```

It only needs to be run once.  It creates a file named `.env` identifying the setting the IP_ADDRESS variable to that of your machine.

To launch the service enter the following command:

```bash
docker compose up -d
```

Now populate the service with some initial data:

```bash
../reset.py
# Windows:  python ..\reset.py
 ```

::: tip Note
You can run the `reset.py` script at any time to reset the data to this initial state.
:::

This populates the service with the following data:

<style>
td.cell {
  font-size: 9.5pt;
}
th.header {
  font-weight: bold;
}
</style>
<table>
<thead>
<tr>
  <th class="header">Venues</th>
  <th class="header">Events</th>
  <th class="header">Registrations</th>
  <th class="header">Accounts</th>
</tr>
</thead>
<tbody>
<tr>
  <td class="cell">Developer Meeting Room</td>
  <td class="cell">Daily Standup</td>
  <td class="cell">
    phartman<br/>
    tgraves<br/>
    jkelly<br/>
    fwinters</td>
  <td class="cell" rowspan="5">
    Pat Hartman (member)<br/>     
    Terry Graves (member)<br/>    
    Jamie Kelly (member)<br/>     
    Felicia Winters (member)<br/> 
    Courtney Lopez (member)<br/>  
    Samantha Heath (member)<br/>  
    Gail Johnson (member)<br/>    
    Denise Thibideau (member)<br/>
    Mel Anderson (manager)<br/>   
    Harper Reagan (HR)
  </td>
</tr>
<tr>
  <td class="cell"></td>
  <td class="cell">Requirements Review</td>
  <td class="cell"></td>
</tr>
<tr>
  <td class="cell">Customer Meeting Room 1</td>
  <td class="cell"></td>
  <td class="cell"></td>
</tr>
<tr>
  <td class="cell">Customer Meeting Room 2</td>
  <td class="cell"></td>
  <td class="cell"></td>
</tr>
<tr>
  <td class="cell">Main Boardroom</td>
  <td class="cell">All Hands</td>
  <td class="cell"></td>
</tr>
</tbody>
</table>
