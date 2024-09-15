// process file
const readReceipt = require("./readReceipt")
const fileInput = document.getElementById('file-upload');
const processButton = document.getElementById('step-check-processfile');
const fileNameDisplay = document.getElementById('file-name');

let selectedFile = null;

// Listen for file selection
fileInput.addEventListener('change', function(event) {
    selectedFile = event.target.files[0]; // Get the file from input
    if (selectedFile) {
        fileNameDisplay.textContent = `Selected file: ${selectedFile.name}`;
    } else {
        fileNameDisplay.textContent = 'No file selected';
    }
});

// Trigger file input when label is clicked
document.querySelector('.custom-file-upload').addEventListener('click', function() {
    fileInput.click();
});