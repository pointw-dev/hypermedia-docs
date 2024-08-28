# What is hypermedia?

* **Hypermedia** is data that includes links.
* It comes from **hypertext** (the HT in HTTP).  Hypermedia allows links in various media types, not just text.
* **Hypermedia** powers the World Wide Web 
* It can be used to enrich your services APIs as well.

**Key Concept**:  Hypermedia APIs include links with its data.  The link syntax is defined by a well-known specification like [HAL](https://stateless.group/hal_specification.html) or [Collection+JSON](http://amundsen.com/media-types/collection/format/).  Client apps that follow the specification know how to follow the links.

## Why use hypermedia?
* Hypermedia addresses the problem of tight coupling between clients and servers.  
* Tight coupling happens when knowledge of a service's architecture is baked into the client's code.
* This knowledge can be:
  * in the form of a contract
  * details of the service applications themselves and where they are deployed
  * resource endpoints
* Any changes server-side could invalidate that baked-in knowledge, breaking the client.  
* Hypermedia helps because its links allow clients to discover this knowledge just-in-time.  
* Server-side changes update the target of the links.  Clients follow the new links as if nothing happened.

## How does it work?
* The most important consideration is that the client should be coded to a resource model, not a service model.
* The client should not know...
  * ...how the service is implemented, only what it offers.
  * ...where the service is deployed, only how to find it.
  * ...the service's architecture, only how to navigate it.
* 

## Example
* TODO

## Benefits
* TODO

## FAQ
<faq-entry>
  <template #question>
    How does a hypermedia API differ from traditional REST APIs?
  </template>
 
  <template #answer>
    Traditional REST APIs often rely on predefined endpoints, requiring clients to know the exact structure of the API. Hypermedia, on the other hand, allows clients to discover resources and actions dynamically through embedded links, reducing the need for upfront knowledge and making the system more flexible and resilient to changes.
  </template>
</faq-entry>

<faq-entry>
  <template #question>
    Will implementing hypermedia complicate my API?
  </template>

  <template #answer>
    Implementing hypermedia does require a shift in how you design and interact with your API, but it doesn't necessarily complicate it. By following established specifications like HAL or Collection+JSON, you can provide clear and consistent link structures. This can actually simplify client interactions by providing a self-discoverable API.
  </template>
</faq-entry>


<faq-entry>
  <template #question>
    Is hypermedia suitable for all types of APIs?
  </template>

  <template #answer>
    While hypermedia is highly beneficial for many APIs, especially those that need to evolve over time or have complex interactions, it may not be necessary for very simple or static APIs. However, for any API that expects to grow or change, hypermedia provides a robust framework for managing those changes without breaking clients.
  </template>
</faq-entry>

<faq-entry>
  <template #question>
    How do clients know how to interpret the links?
  </template>

  <template #answer>
    Links in hypermedia responses are defined by well-known specifications such as HAL or Collection+JSON. These specifications include conventions for embedding links and metadata, allowing clients that understand the specification to interpret and follow the links correctly.
  </template>
</faq-entry>

<faq-entry>
  <template #question>
    Won’t adding hypermedia increase the size of my responses?

  </template>

  <template #answer>
    Adding hypermedia links does increase the size of your responses, but the benefits of decoupling and flexibility often outweigh the minimal increase in payload size. The added information allows clients to navigate and interact with your API more effectively, leading to a more robust and maintainable system.
  </template>
</faq-entry>

<faq-entry>
  <template #question>
    How does hypermedia handle versioning?
  </template>

  <template #answer>
    Hypermedia supports versioning by allowing the server to evolve independently. Changes to resources and endpoints are managed through updated links, so clients follow the most current paths without needing to hardcode versions. This reduces the need for explicit versioning in URLs and simplifies the client-server interaction.
  </template>
</faq-entry>

<faq-entry>
  <template #question>
    What about performance? Doesn’t hypermedia add extra HTTP requests?
  </template>

  <template #answer>
    While hypermedia can result in additional HTTP requests as clients follow links, it can also improve efficiency by reducing the need for clients to prefetch data they may not need. Clients request information as needed, which can lead to more targeted and efficient interactions. Additionally, strategies like HTTP caching and link prefetching can mitigate potential performance impacts.
  </template>
</faq-entry>

<faq-entry>
  <template #question>
    Can I use hypermedia with existing API frameworks?
  </template>

  <template #answer>
    Yes, most modern API frameworks support the addition of hypermedia controls. You can often find libraries or plugins for popular frameworks like Django, Flask, or Express.js that help you implement hypermedia links according to established specifications.
  </template>
</faq-entry>

<faq-entry>
  <template #question>
    Are there real-world examples of successful hypermedia APIs?
  </template>

  <template #answer>
    Yes, many large-scale and successful APIs use hypermedia principles, including APIs from companies like GitHub, PayPal, and Amazon. These APIs benefit from the flexibility and resilience that hypermedia offers, enabling them to evolve and scale effectively over time.
  </template>
</faq-entry>


# Diving deeper



## A simple case study
Let's look at a Acme Inc. who offers the following via it's API <sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>:

<p align="center">
    <img src="/img/c-o-p.svg" width="400" />
</p>

The software team implemented this resource model in a single service called `OrderProcessing`.  Made sense at the time.  The client software has code that looks like this:

```python
BASE_API_URL = 'https://hq.example.org/order-processing'
...
customer = http.get(BASE_API_URL + '/customers/' + customer_id)
products = http.get(BASE_API_URL + '/products/' + product_id)
response = http.post(BASE_API_URL + '/orders', data=order_data)
```
Some reading this are saying to themselves, "looks right - exactly as I've done successfully hundreds of times".

Indeed, this worked well at Acme for years - until the company became more and more successful.

### What could go wrong?
Nobody intends to create a tightly coupled architecture.  But they are [all too common](http://www.laputan.org/mud/).  It is seductively simpler (at first) to write the client with the service in mind.  But before long you end up with a conversation like this:

> **Product Owner**: Our customers are complaining that order processing is too slow.  Can you speed it up?
> <br/>
> <br/>
> **Software Engineer**:  Sure, we will need to push a new version of the client software to all 10,000 customers.
> <br/>
> <br/>
> **Product Owner**:  Why would speeding up the server require a new client?
> <br/>
> <br/>
> **Software Engineer**:  The slowdown is due to the OrderProcessing service.  It not only processes orders, but enrolls customers and updates products in inventory.  Based on traffic analysis over the past year, to fix this we need to break it into three separate services. This will balance the load and improve performance. However, the old version of the client won’t know where we moved things to.  So we will also need to maintain two versions of the API for as long as it takes for all 10,000 customers to upgrade to the new client, increasing our server costs.
> <br/>
> <br/>
> **Product Owner**: Couldn't you just....
> <br/>
> <br/>
> **Software Engineer**: Yes, but it is that type of band-aid thinking that got us here in the first place. 


### How did we get here?
Coupling happens when a client knows more than it should about the services it relies on.  This creates a problem because if the service changes the client may no longer function correctly.  This limits the service's ability to evolve.  When you want to make a change, you can't - or it's too expensive to do so.

The trick is for the client software to know **what** is available without know **how** it is delivered.

New customer adds increased slowly over time, so a minor increase in traffic to the `customers` endpoint.  But existing customers kept ordering more and more.  Orders grew from thousands, to tens of thousands, to millions per day.  

![traffic analysis](/img/traffic.png)

So the Software Engineer recommended it be split into three:
* the `customers` endpoint served by a service running in the HQ data centre
* the `products` endpoint served by a service running in warehouse data centre to speed its bi-weekly bulk uploads
* the `orders` endpoint service to be moved to an auto-scaling group on AWS.

This means the client software had to change from the above to:

```python
ORDERS_API_BASE_URL = 'https://ec2-11-111-11-111.compute-1.amazonaws.com/order-processing'
CUSTOMER_API_BASE_URL = 'https://hq.example.org/customer-enrollments'
PRODUCTS_API_BASE_URL = 'https://warehouse.example.org/product-inventory'
...
customer = http.get(ORDERS_API_BASE_URL + '/customers/' + customer_id)
products = http.get(CUSTOMER_API_BASE_URL + '/products/' + product_id)
response = http.post(PRODUCTS_API_BASE_URL + '/orders', data=order_data)
```

The needs and behaviours of the client software did not change - but because it knew **how** its services were delivered, it had to change when we changed how those services were delivered.

-----
<a id="fn1" href="#fnref1" class="footnote-backref">[1]</a> This an admittedly contrived example, designed to focus on the concept, not necessarily the technical nature of the problem.  But it *is* based on real-world experiences.