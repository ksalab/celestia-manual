## Celestia: UI for PFB transactions

This website generates & sends PFB transactions to a light node (or any node for that matter!) on Celestia blockchain.

  

Written in plain HTML, CSS, JavaScript (some jQuery) & some Python.

(**!!!**) This application requires you to have a node on Celestia blockchain.

##  

**How does it work? Can you show a demo?**

Here is a GIF showing how the namespace ID & data are being generated and submitted to a node.

![Demo](https://s12.gifyu.com/images/ezgif.com-video-to-gif8bdd4f222b22133a.gif)

When clicking «**Submit**», the ID & data are sent via **WebSocket** to a node that has **Python** program running a WebSocket server. The latter extracts the data from the incoming message & launches a **Shell** script that does a cURL request to a node’s gateway for PFB transaction submission.

The result (a transaction hash & block height) is extracted and sent back to the website which opens a new window & shows the TX info on MintScan explorer. For now, you can only send the transaction - you cannot retrieve namespaced shares by block height yet.

If the fields are populated incorrectly or a connection fails - a warning message will pop out.

##

**You’re using WebSockets and a separate Python program? Why such an ass-backwards solution?**

When it came to creating & sending transactions to my light node, even with **gateway.addr** set correctly **&  port** opened on my machine, I noticed that when trying to send POST requests manually, I got 405 **Method Not Allowed** error. I’m assuming that’s for security reasons because in that fashion anyone could send a ton a transactions & drain node’s wallet pretty quickly. I’m not that of a top web-developer, so I decided to make my own «solution to a problem».

  

A hack-ish workaround for me was to create a WebSocket between my website & a Python script that accepts WebSocket connections, and the latter launches a process for cURL requests to **http://localhost:26659/submit_pfb**, returning the result back to the website. That way I don’t install any additional dependencies & keep everything straightforward (with a room for improvement, too!)

##

**Okay, how can I make it work for my node, too?**

1.  At first, you must enable **gateway** & set an IP and port to that when starting the node.

Docs: [https://docs.celestia.org/developers/node-tutorial/#submit-a-pfb-transaction](https://docs.celestia.org/developers/node-tutorial/#submit-a-pfb-transaction) (**CAUTION** section)

2.  Create a folder & drop the contents of ‘**_pfb_python_**’ there.

  

You may need to make ‘**_request.sh_**’ executable:
*chmod +x request.sh*

3.  Install **websockets** for Python via **PIP**:
_pip install websockets_

4.  Next, **run** the Python program with port specified as an argument. You can choose any port that’ll be used for WebSocket server, but make sure it’s opened on your router & your firewall, and that it’s unoccupied!

-   You also need to have a Python program run in the background - you may use **screen** or **tmux** for that, or create a **service** file & have it running that way.

  

*python3 main.py [port]*

##

**As for website:**

You may host the website anywhere you want - just drop all the contents of a ‘**_website_**’ into root directory.

##

**Future improvements**

  

- [ ] Add the functionality to retrieve shares by block height
- [ ] Remove the workaround with a Shell script for cURL (*maybe, using a Python library for that?*)
- [ ] Connect Keplr for signing the transaction (*somehow, not sure for now…*)

##

Demo website: **http://xbee.space**

Demo node (IP & port): **xbee.space, 5445**
