const httpStatus = require("http-status-codes");
const { plainTextContentType, htmlContentType, cssContentType, imgContentType } = require("./contentType"); //otherwise htmlContentType not defined error
const { customReadFile } = require("./utils"); //otherwise error with customReadFile

routes = {
  GET: {
    "/": (req, res) => {
      res.writeHead(httpStatus.OK, htmlContentType);
      customReadFile("views/index.html", res);
    }, 
    
    //HTML FILES
    "/index.html": (req, res) => {
      res.writeHead(httpStatus.OK, htmlContentType);
      customReadFile("views/index.html", res);
    },

    //CSS FILES
    "/public/css/style.css": (req, res) => {
      const cssFilePath = "./public/css/style.css"; // Path to CSS
      res.writeHead(httpStatus.OK, cssContentType);
      customReadFile(cssFilePath, res);    
    },

    // IMAGE FILES
    "/public/image/ReceiptIcon.png": (req, res) => {
      const imgFilePath = "./public/image/ReceiptIcon.png"; // Path to Image
      res.writeHead(httpStatus.OK, imgContentType);
      customReadFile(imgFilePath, res);
    },

    // JS FILES
    "/public/js/uploadName.js": (req, res) => {
        const jsFilePath = "./public/js/uploadName.js"; // Path to JS file
        res.writeHead(httpStatus.OK, plainTextContentType); // Update content type to match JS
        customReadFile(jsFilePath, res);
    },
    
    "/public/js/processFile.js": (req, res) => {
        const jsFilePath = "./public/js/processFile.js"; // Path to JS file
        res.writeHead(httpStatus.OK, plainTextContentType); // Update content type to match JS
        customReadFile(jsFilePath, res);
    },
  },
  POST: {},
};
exports.handle = (req, res) => {
  try {
    if (routes[req.method][req.url]) {
      routes[req.method][req.url](req, res);
    } else {
      res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
      res.end("<h1>No such file exists</h1>");
    }
  } catch (ex) {
    console.log("error: " + ex + req);
  }
};
exports.get = (url, action) => {
  routes["GET"][url] = action;
};
exports.post = (url, action) => {
  routes["POST"][url] = action;
};
