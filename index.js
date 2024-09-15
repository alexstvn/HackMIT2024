const fs = require("fs");
const port = 8080;
// IMPORTS
const http = require("http");
const httpStatus = require("http-status-codes");

// Imports of js files
const { plainTextContentType, htmlContentType, cssContentType, imgContentType } = require("./contentType");
const router = require("./router");
const { customReadFile } = require("./utils");

router.post("/", (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end("POSTED");
});

// Create Server
http.createServer(router.handle).listen(port);
console.log(`The server is listening on port number: ${port}`);