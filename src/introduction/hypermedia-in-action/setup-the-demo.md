# Set up the demo

## Prerequisites
To run this demo you will need:
* Docker
* Python
* git
* (optional) Postman, cURL, or other API calling tool
* (optional) VSCode, or other IDE or text editor

## Clone the repo
You can clone the demo [from GitHub](https://github.com/pointw-dev/hypermedia-demo):

```bash
git clone https://github.com/pointw-dev/hypermedia-demo.git
```

The repo contains both a server and clients in the following folders:

| Folder     | Description                                                                                                                                                                                                   |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| server/    |                                                                                                                                                                                                               |
| └─reset.py | Resets the data stored in the service.  Run this before running any other clients for the first time, and any time thereafter to start the scenario over.                                                     | 
| └─v1/      | This folder contains the initial version of Event Buddy, released as a single service.                                                                                                                        | 
| └─v2/      | This folder contains a version of Event Buddy that provides the same data and capabilities as v1, but its architecture has been refactored.  This will be described in further detail in an upcoming section. |
| clients/   |                                                                                                                                                                                                               |
| └─alice/   | This folder contains a client that uses Event Buddy following hypermedia.  Works with Event Buddy v1, v2 and any future version as long as it stays committed to the hypermedia approach.                     | 
| └─bob/     | This folder contains a client built to use Event Buddy v1, implemented with knowledge of the service architecture.                                                                                            |
| └─bob-v2/  | This folder contains an updated version of the v1 client built to use Event Buddy v2, implemented with knowledge of the service architecture                                                                  |

## Install packages

In the repo folder, create a Python virtual environment called `hypermedia-demo` (or any name you wish).  This step is optional but highly recommended.

Install [halchemy](https://github.com/pointw-dev/halchemy), which is used by the `reset.py` script.

```bash
pip install halchemy
```
::: tip <i/>
Installing halchemy also installs the [requests](https://requests.readthedocs.io/en/latest/) library. Both the `alice` client and the `bob` client use this - to keep the comparison between the two apples-to-apples.
:::
