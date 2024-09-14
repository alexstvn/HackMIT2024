// Array to store names
let nameArray = [];

// Function to add a name and update Step 1 table
function addName() {
    var name = document.getElementById("step1-name").value;

    if (name) {
        // Add the name to the array
        nameArray.push(name);

        // Update the HTML list
        var node = document.createElement("LI");
        var textnode = document.createTextNode(name);
        node.appendChild(textnode);
        document.getElementById("step1-namelist").appendChild(node);
        // Clear input field
        document.getElementById("step1-name").value = "";

    } else {
        alert("Please enter a name.");
    }
}

// Function to generate a random number for Money Owed
function getRandomMoneyOwed() {
    return (Math.random() * 100).toFixed(2); // Generates random money between 0 and 100
}

// Function to update the table in Step 5
function updateMoneyTable() {
    var tableBody = document.getElementById("step5-tbody");

    // Clear any existing rows in the Step 5 table body
    tableBody.innerHTML = "";

    // Loop through the nameArray and create table rows
    nameArray.forEach((name) => {
        var row = document.createElement("tr");

        // Create the name cell
        var nameCell = document.createElement("td");
        var nameText = document.createTextNode(name);
        nameCell.appendChild(nameText);
        row.appendChild(nameCell);

        // Create the money owed cell
        var moneyCell = document.createElement("td");
        var moneyText = document.createTextNode(getRandomMoneyOwed()); // Random money owed
        moneyCell.appendChild(moneyText);
        row.appendChild(moneyCell);

        // Append the new row to the Step 5 table body
        tableBody.appendChild(row);
    });
}