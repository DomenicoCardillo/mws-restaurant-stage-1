# Restaurant Reviews
---

## How can i see it on my localhost?

### Run the server

Clone the udacity course server [repository](https://github.com/udacity/mws-restaurant-stage-3), and follow the steps on Getting Started section.

### Run the application

1. Clone this repository using: `$ git clone https://github.com/DomenicoCardillo/mws-restaurant-stage-1.git`.

2. In the application folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. 

In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

3. Run `chmod +x ./dev/deploy.sh ./dev/init.sh` for add permission to execute this files

4. Run `dev/init.sh`

You have to edit `config.js` with your local url e.g. `http://localhost:8000`, then press a key to continue the config script.

5. With your server running, visit the site: e.g. `http://localhost:8000`.

## How can i see it online?

Visit this [website](http://goo.gl/gc6ar5) to see the live demo.
