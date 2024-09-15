//Initialize Constants
const fileInput = document.getElementById('file-upload');
const processButton = document.getElementById('step-check-processfile');
const fileNameDisplay = document.getElementById('file-name');

let selectedFile = null;

fileInput.addEventListener('change', function(event) {
    selectedFile = event.target.files[0];
    console.log(selectedFile); // Verify the selected file
    if (selectedFile) {
        fileNameDisplay.textContent = `Selected file: ${selectedFile.name}`;
    } else {
        fileNameDisplay.textContent = 'No file selected';
    }
});

//Add File
document.querySelector('.custom-file-upload').addEventListener('click', function() {
    fileInput.click();
});

//Process File
processButton.addEventListener('click', function() {
    if (selectedFile) {
        const formData = new FormData();
        formData.append('receipt', selectedFile);

        fetch('/process-receipt', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);

            // Convert data to JSON string
            const jsonString = JSON.stringify(data, null, 2);

            // Create a Blob from the JSON string
            const blob = new Blob([jsonString], { type: 'application/json' });

            // Create a link element
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'data.json';

            // Append the link to the document and trigger a click
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the link
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error processing receipt:', error);
        });
    } else {
        alert('No file selected');
    }
});


//Get json textbox
document.getElementById('process-json').addEventListener('click', function() {
    var jsonString = document.getElementById('json-input').value;

    try {
        // Parse the JSON string
        var jsonData = JSON.parse(jsonString);

        // Display the parsed JSON data
        //document.getElementById('json-output').textContent = JSON.stringify(jsonData, null, 2);
    } catch (error) {
        // Display an error message if the JSON is invalid
        document.getElementById('json-output').textContent = 'Invalid JSON: ' + error.message;
    }
});

//Intialize Static Data
const staticData = {
    line_items: [
        {
            description: "Sample Item 1",
            total: 5.99,
            //people: ["p1"]
        }
    ]
  };
  
  
  //Add people property
  function addPeopleProperty() {
    staticData.line_items = staticData.line_items.map(item => {
        // Add 'people' property as an empty array
        return {
            ...item,
            people: []
        };
    });
  }
  
  function processJSON() {
      const jsonString = document.getElementById('json-input').value;
  
      try {
          // Parse the JSON string
          const data = JSON.parse(jsonString);
  
          // Check if `line_items` is present in the data
          if (data && data.line_items) {
              mergeData(data.line_items); // Merge the fetched data
              updateTable(data.line_items); // Pass the `line_items` array to the updateTable function
              addPeopleProperty();
          } else {
              throw new Error('`line_items` not found in the JSON data');
          }
      } catch (error) {
          console.error('Error processing JSON:', error);
          document.getElementById('json-output').textContent = 'Invalid JSON or missing `line_items`: ' + error.message;
      }
  }
  
  // Add event listener for the button click
  document.getElementById('process-json').addEventListener('click', processJSON);
  
  //Function to merge receipt JSON with sample JSON
  function mergeData(newItems) {
    if (Array.isArray(newItems)) {
        staticData.line_items = staticData.line_items.concat(newItems);
    } else {
        console.error('Fetched data is not an array');
    }
  }
  