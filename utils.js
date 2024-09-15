const fs = require("fs");

//customReadFile command
const customReadFile = (file, res) => {
  fs.readFile(`./${file}`, (error, data) => {
    if (error) {
      console.log("Error reading the file");
    }
    res.end(data);
  });
};
//for importing into other js
module.exports = {
  customReadFile,
};
