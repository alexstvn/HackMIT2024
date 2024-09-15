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

document.querySelector('.custom-file-upload').addEventListener('click', function() {
    fileInput.click();
});

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
        })
        .catch(error => {
            console.error('Error processing receipt:', error);
        });
    } else {
        alert('No file selected');
    }
});
