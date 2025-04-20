# Run the clients

::: warning Before running the clients
Make sure you have
* shut down v1 by running `docker compose down` in `server/v1/`
* change to `/server/v2/` then
  * run `before_docker_compose.py` to create the `.env` file
  * run `docker compose up -d` to launch the service
  * run `../reset.py` to populate the service
    * Windows: `python ..\reset.py`

otherwise the clients will not work as described below.  (see [Launch and populate](./#launch-and-populate))
:::


## The Alice client
Let's start with the `alice` client.  We will do exactly the same thing as when v1 was running.  Notice how everything just works.

In the `clients/alice/` folder run `meeting_buddy.py`  You will see the following:

```text
Meeting Buddy
=============
Venues
------
1. Developer Meeting Room
2. Customer Meeting Room 1
3. Customer Meeting Room 2
4. Main Boardroom

Please select a venue to manage [1-4] (q to quit, c to cancel): 
```

To see the events scheduled in the Developer Meeting Room, type `1` and hit Enter:

```text
Events for Developer Meeting Room
---------------------------------
2025-02-07
  1. 09:00:00 Daily Standup (15 minutes)
  2. 10:00:00 Requirements review (1 hour)
[A]dd an event, [R]egister, [V]iew attendees (q to quit, c to cancel):
```

To see who is attending the Daily Standup, type `v` (enter) then `1` (enter):

```text
Attending "Daily Standup" on 2025-02-07 at 09:00:00:
- Pat Hartman
- Terry Graves
- Jamie Kelly
- Felicia Winters
```

::: warning Ugly UI ahead
To keep the code small and easier to focus on the API integration, the UI is very ugly and finicky.
:::

To schedule a Code Review meeting in the Developer Meeting Room:
* type `a` (enter)
* type `Code Review` (enter)
* type `2025-03-14` (enter)
* type `10:00:00` (enter)
* type '`1h` (enter)

```text
Events for Developer Meeting Room
---------------------------------
2025-02-07
  1. 09:00:00 Daily Standup (15 minutes)
  2. 10:00:00 Requirements review (1 hour)
[A]dd an event, [R]egister, [V]iew attendees (q to quit, c to cancel): a
Please enter the name of your event (q to quit, c to cancel): Code Review
What date is your event? [YYYY-MM-DD] (q to quit, c to cancel): 2025-03-14
What time does the event start? [HH:MM:SS] (q to quit, c to cancel): 10:00:00
How long is the event? [#m or #h] (q to quit, c to cancel): 1h

> Success

Events for Developer Meeting Room
---------------------------------
2025-02-07
  1. 09:00:00 Daily Standup (15 minutes)
  2. 10:00:00 Requirements review (1 hour)
2025-03-14
  3. 10:00:00 Code Review (1 hour)
[A]dd an event, [R]egister, [V]iew attendees (q to quit, c to cancel):
```

::: info Note
We will look at registering to attend an event in a future discussion.
:::

Exit the `alice` client: type `q` (enter).

## The Bob client
Change into `clients/bob` then run `meeting_buddy.py`.

Right away we run into an error:

```text
Meeting Buddy
=============
Traceback (most recent call last):
  File "/home/michael/git/pointw-dev/hypermedia-demo/clients/bob/./meeting_buddy.py", line 33, in <module>
    main()
  File "/home/michael/git/pointw-dev/hypermedia-demo/clients/bob/./meeting_buddy.py", line 26, in main
    venue = Venue.select_venue()
            ^^^^^^^^^^^^^^^^^^^^
  File "/home/michael/git/pointw-dev/hypermedia-demo/clients/bob/venue.py", line 94, in select_venue
    venues_data = result.json()['_embedded']['venue']
                  ~~~~~~~~~~~~~^^^^^^^^^^^^^
KeyError: '_embedded'
```

Let's take a look at `venue.py` around line 90:

```python:line-numbers=90{5}
@staticmethod
def select_venue():
    url = Api.url_join(BASE_API_URL, '/venues')
    result = requests.get(url, headers=Api.get_headers())
    venues_data = result.json()['_embedded']['venue']
    venues = [Venue(venue) for venue in venues_data]
```

We can see the problem is the two lines before 94. The URL is built using the location where the `/venues` resource _used to be_ served.  The GET returns something that does not include `_embedded` (a 404 response that a real client would check for).  When line 94 tries to access  `_embedded`, the `KeyError` is thrown.

In the next page we will look at what it will take to fix `bob` to work with v2.  

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
