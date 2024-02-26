// Author: Tammy Hartline
// February 18, 2024
// CS-465 Full Stack Development SNHU
// Final Term for BS C.S. with a concentration in Data Analysis
// app.js


This JavaScript code is the main entry point for an Express.js application. Here's a breakdown of what it does:

Module dependencies: The code begins by importing necessary modules using require(). These modules include http-errors for creating HTTP error objects, express for server operations, path for handling file and directory paths, cookie-parser for parsing cookie headers, morgan for HTTP request logging, and hbs for using Handlebars view engine.

Router setup: The code imports router modules for different parts of the application (index, users, and travel).

Express app creation: An Express application instance is created by calling express().

View engine setup: The code sets the views directory and registers Handlebars partials. It then sets the view engine to Handlebars.

Middleware setup: The code uses various middleware functions. logger('dev') logs HTTP requests, express.json() parses incoming requests with JSON payloads, express.urlencoded({ extended: false }) parses incoming requests with URL-encoded payloads, cookieParser() parses cookie headers, and express.static(path.join(__dirname, 'public')) serves static files.

Router usage: The code uses the imported routers, associating them with their respective paths.

Error handling: The code includes middleware functions for handling 404 errors and other errors. If an error occurs, an error page is rendered.

Exporting the app: Finally, the Express application instance is exported for use in other modules.