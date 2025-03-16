# Run the clients
Before getting into the code of the two clients, lets spin up each of them and see how they work.

::: warning Before running the clients
Make sure you change into the `server/v1/` folder then
* run `docker compose up -d`  to launch the service
* run the `../reset.py` script to populate the service
  * Windows: `python ..\reset.py`

otherwise the clients will not work as described below.  (see [Launch and populate](./#launch-and-populate))
:::

<centered-image src="/img/event-buddy-v1-with-clients.png" width="600" rounded />

## The Alice client
Let's start with the `alice` client.

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
Change into `clients/bob` then run `meeting_buddy.py`.  Now repeat the same steps as before:

View who is attending the Daily Standup in the Developer Meeting Room:
* `1` (enter)
* `v` (enter)
* `1` (enter)

Add an event called "Post-mortem" in the Developer Meeting Room:
* `a` (enter)
* `Post-mortem` (enter)
* `2025-04-01` (enter)
* `13:00:00` (enter)
* `30m` (enter)

::: info Note
As mentioned before, we will look at registering to attend an event in a future discussion.
:::
You will notice the user experience with `bob` is identical to `alice`.

Exit the `bob` client: type `q` (enter).

<comments-section repo="pointw-dev/hypermedia-docs" repoId="R_kgDOODT1fw" category="General" categoryId="DIC_kwDOODT1f84CoFLx" />
