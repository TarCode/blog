---
title: REST API with Express
date: "2017-10-12T08:10:42.768Z"
path: "/rest-api-express/"
---

Greetings people of the world. Today we make a REST API in NodeJS with Express.

### What's a REST API?
Initially, the World Wide Web was created for documents (HTML). Today, there's a name for every type of entity that can be identified.

REST, or Representational State Transfer or RESTful web services allows us to make requests using GET, PUT, POST and DELETE along with URL's to access and manipulate texty representations of resources. In other words, it allows us to use verbs with a URL to either receive, or manipulate data in a specific format (XML, JSON, HTML). 

Oh, and the originator of the REST architecture is [Roy Fielding](https://en.wikipedia.org/wiki/Roy_Fielding) who also happens to be co-founder of the Apache HTTP Server project.

### What's Express?
Express is a minimal web application framework written in NodeJS that provides with a sweet set of features that allow us to quickly set up a server side application (API or server-rendered Web App). Read more about it [here](https://expressjs.com)

Now that we know what those are, lets start building!

## Creating the Server

Create a folder `mkdir rest-api` and enter the folder `cd rest-api`.

Run `npm init` to initialize the folder as an npm respository so you can install dependancies.

Run `npm install express --save` to install Express and save it as a dependancy.

Create a file `touch main.js` .

In `main.js`:
Require the express library and store it in a variable called `express`.
```
const express = require('express')
```
That would give you the ability to create an instance of an Express App by just calling `express()`. So thats what we'll do next.
Create a variable called `app` and assign the `express()` call to it like so:
```
const app = express()
```

Now we have the ability to call any of the methods provided by Express.

Let's create a simple server that runs on port 3000. 

The instance of Express that we created (called `app`) gives us access to all the methods available in the Express framework. One of those methods is `listen` or in this case `app.listen`, which takes in the port number and a callback function to be executed when the method is called.

```
app.listen(3000, () => {
    console.log("App is listening on port 3000");
})
```

Sve your file and then head to your terminal and run `node main.js` inside your project folder. You should see the message you logged showing up on the terminal now. 

## Creating Routes

Once we have our server up and running, we need to define some routes so that our server has some way of receiving requests. A route is similar to an address in that in tells the server what request is being made/what to do with the request.

To define a route, we can call either `app.route("/yourroute")` with `/yourroute` being the name of the route passed in as the first parameter, or we can directly define the verb we want to use for the type of request. E.g. `app.get("/yourroute")`.

Let's first create our root route, `/`, which makes a GET request and respond with a string containing `"Hello World!"`.

```
app.get('/', (req, res) => {
    res.send("Hello World!)
})
```

Note that in the `app.get` method, the second parameter is callback which gives us access to the request - `req` and response - `res` objects which provides us with a set of methods for access the requests and responses. In this case we respond by sending a string containing `"Hello World!"`.

Now let's create a route to POST some JSON data to the server. With POST methods, you request the server to accept the data enclosed in the body of the request.

Let's call our POST route `/person` which accepts the response body and logs it to the console.

```
app.post('/person', (req, res) => {
    const data = req.body

    console.log("This is the request body", data);

    // Do something with the data you just recieved
})
```

To make a POST request, we can use cURL as our client to make our requests from the command line: 
```
curl -d '{"name":"Joe", "age":21}' -H "Content-Type: application/json" -X POST http://localhost:3000/person
```

To break down that cURL post:
`curl` is the command and name of the application we are using to make the POST, `-d` is the data flag, which is followed by some data (in this case: `{"name": "Joe", "age": 21 }`), `-H` is the header flag, which indicates that the header comes next (`"Content-Type: application/json"`), `-X` indicates that we are now making an `XMLHttpRequest` and `POST` is the type of request. What comes after, is the URL you making the request to 😬.

(If you prefer something fancier you could download [POSTMAN](https://www.getpostman.com/)).


Usually you would accept the data and persist it to a database (Which we'll probably cover in the next tutorial).

In addition, you can also define PUT and DELETE routes, which accepts some form of id as a parameter and is usually used for updating and deleting individual sets of data.


Check the Github repo for this tutorial:
- [Express REST API](https://github.com/TarCode/basic-rest-api)

Check these out for some further reading:

- [REST API Tutorial (With Video)](http://www.restapitutorial.com/)


Happy Coding!!! 👽 🤓 👾

