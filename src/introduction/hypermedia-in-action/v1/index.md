---
prev:
  text: 'Setup the demo'
  link: '/introduction/hypermedia-in-action/setup-the-demo'

next:
  text: 'Explore with Postman'
  link: '/introduction/hypermedia-in-action/v1/explore-with-postman'
---

# Launch Event Buddy v1
## docker-compose.yml
The initial version of Event Buddy is built as a single service powering the whole domain.  

<centered-image src="/img/event-buddy-v1-server-only.png" width="275" rounded />

The `docker-compose.yml` for this version is in the `server/v1` folder:

```yaml
name: event-buddy

services:
  event-buddy:
    image: pointw/event-buddy
    container_name: event-buddy
    ports:
      - "2112:80"
    environment:
      AUTH_ADD_BASIC: true
      HY_INSTANCE_NAME: event-buddy demo
      HY_MONGO_HOST: event-buddy-mongo
      HY_API_PORT: 80
    depends_on:
      - event-buddy-mongo

  event-buddy-mongo:
    image: mongo
    container_name: event-buddy-mongo
    ports:
      - "27017:27017"
```

## Launch and populate
To launch the services, change into the `server/v1/` folder then enter the following command:

```bash
docker compose up -d
```

The Event Buddy service is now listening for requests at `http://localhost:2112`.

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
