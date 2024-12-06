# Node.js Server - EADDRINUSE Error

This repository demonstrates a common error encountered when running Node.js servers: the `EADDRINUSE` error.  This error occurs when the server tries to bind to a port that's already in use by another process.

## The Bug

The `bug.js` file contains a simple HTTP server. If you run this server and then attempt to run it again without stopping the first instance, you'll encounter the `EADDRINUSE` error.

## The Solution

The `bugSolution.js` file demonstrates a solution to prevent the error. It checks if the port is available before attempting to start the server. If the port is in use, it waits a short period before retrying.