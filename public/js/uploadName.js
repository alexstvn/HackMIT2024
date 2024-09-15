// Array to store names
let nameArray = [];
let nameActual = []
let person = '';
// Function to add a name and update Step 1 table
function addName() {
    var name = document.getElementById("step1-name").value;

    if (name) {
        // Add the name to the array

        // Update the HTML list
        var node = document.createElement("button");
        var textnode = document.createTextNode(name);
        var paragraph = document.createElement("p");

        
        node.id = 'p' + nameArray.length;
        nameArray.push(node.id);
        nameActual.push(name)
        // Set a class for the <p> element
        paragraph.className = 'price';
        paragraph.textContent = 0;

        node.appendChild(textnode);
        node.appendChild(paragraph);

        node.onclick = function() {
            selectPerson(this.id); // Call selectPerson with the button's id
        };

        document.getElementById("step1-namelist").appendChild(node);
        // Clear input field
        document.getElementById("step1-name").value = "";

    } else {
        alert("Please enter a name.");
    }
}

// Function to generate a random number for Money Owed
// Used to just supply table with values until we can extract values from a receipt
function getRandomMoneyOwed() {
    return (Math.random() * 100).toFixed(2); // Generates random money between 0 and 100
}

function selectPerson(pID) {
    person = pID;
    // You can perform other actions with pID here
}


// Function to update the table in Step 5
function updateMoneyTable() {
    var tableBody = document.getElementById("step-calculate-tbody");

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

  // Function to show table on webpage
  function updateTable(items) {
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing table rows

    items.forEach((item, index) => {
        const row = document.createElement('tr');

        // Create description cell
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = item.description;

        // Create total cell
        const totalCell = document.createElement('td');
        totalCell.textContent = item.total;

        // Create people cell (for displaying the names in the people array)
        const peopleCell = document.createElement('td');
        peopleCell.textContent = item.people ? item.people.join(', ') : ''; // Initialize with existing people
        peopleCell.classList.add('people-cell'); // Add class to identify this cell later

        // Append all cells to the row
        row.appendChild(descriptionCell);
        row.appendChild(totalCell);
        row.appendChild(peopleCell); // Append the people cell

        // Add click event listener to each row
        row.addEventListener('click', () => {
            console.log('Row clicked:', item); // Log the clicked row's data
            console.log('Row index:', index); // Log the index of the clicked row
            highlightRow(row);

            // Push the person to the people array for this item
            if (!staticData.line_items[index + 1].people) {
                staticData.line_items[index + 1].people = []; // Initialize array if it doesn't exist
            }
            staticData.line_items[index + 1].people.push(person);
            peopleCell.textContent = staticData.line_items[index + 1].people.join(', '); 
            changeOwe(); // Function to handle any other logic
        });

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

    // Function to update what someone owes
    updateOwe = function(splitter) {
        let owe = 0
        for(i = 1; i < staticData.line_items.length; i++) {
            if(staticData.line_items[i]["people"].includes(splitter)) {
                owe += staticData.line_items[i]["total"]/ staticData.line_items[i]["people"].length
            }
        }
        return Math.round((owe) * 100) / 100;
      }

  // Function to change the text
  function changeOwe() {
    for (let i = 0; i < nameArray.length; i++) {
      let element = document.getElementById(nameArray[i]);
      if (element) { // Ensure the element exists
          let priceElement = element.getElementsByClassName("price")[0];
          if (priceElement) { // Ensure the price element exists
              // Update the text content of the price element
              priceElement.textContent = updateOwe(nameArray[i]);
          } else {
              console.error(`No element with class "price" found inside ${nameArray[i]}`);
          }
      } else {
          console.error(`Element with ID ${nameArray[i]} not found`);
      }
    }
    }

    // Function to highlight row
function highlightRow(row) {
    // Remove highlight from any previously highlighted row
    const previouslyHighlighted = document.querySelector('.highlight');
    if (previouslyHighlighted) {
        previouslyHighlighted.classList.remove('highlight');
    }
    // Add highlight class to the clicked row
    row.classList.add('highlight');
  }