// Get chart data from localStorage:--
let chartData = JSON.parse(localStorage.getItem("currentChartData")) || [];
// console.log(chartData);

function getChartType() {
    return localStorage.getItem("chartType");
}

const chartType = getChartType();

// Render table with existing data:--
function renderTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ''; // Clear existing table content

    // Render rows for existing data :--
    chartData.forEach((data, index) => {
        const row = document.createElement("tr");
        const labelCell = document.createElement("td");
        labelCell.textContent = data.label || '';  
        labelCell.setAttribute("contenteditable", "true"); 
        labelCell.addEventListener('blur', () => saveUpdatedData(index));  // Auto-save on blur (when editing ends)

        const valueCell = document.createElement("td");
        valueCell.textContent = data.y || data.value;  
        valueCell.setAttribute("contenteditable", "true");  
        valueCell.addEventListener('blur', () => saveUpdatedData(index)); 

        const actionCell = document.createElement("td");

        // Add delete button:--
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteRow(index);
        actionCell.appendChild(deleteButton);

        row.appendChild(labelCell);
        row.appendChild(valueCell);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });

    // Add an empty row at the end for new data entry:--
    const emptyRow = document.createElement("tr");
    const emptyLabelCell = document.createElement("td");
    emptyLabelCell.setAttribute("contenteditable", "true");
    emptyLabelCell.addEventListener('blur', () => saveEmptyRow(emptyLabelCell, emptyValueCell));

    const emptyValueCell = document.createElement("td");
    emptyValueCell.setAttribute("contenteditable", "true");
    emptyValueCell.addEventListener('blur', () => saveEmptyRow(emptyLabelCell, emptyValueCell));

    const emptyActionCell = document.createElement("td");

    emptyRow.appendChild(emptyLabelCell);
    emptyRow.appendChild(emptyValueCell);
    emptyRow.appendChild(emptyActionCell);
    tableBody.appendChild(emptyRow);

      //Add message area for duplicate warnings:--
    //   const duplicateMessage = document.getElementById("duplicateMessage");
    //   duplicateMessage.textContent = '';  // Clear previous message
    //   duplicateMessage.textContent="Some thing wrong !";
      
}  

// Save updated data when editing or adding:---
function saveUpdatedData(index) {
    const labelCell = document.querySelector(`#tableBody tr:nth-child(${index + 1}) td:nth-child(1)`);
    const valueCell = document.querySelector(`#tableBody tr:nth-child(${index + 1}) td:nth-child(2)`);

    const label = labelCell.textContent.trim();
    const value = parseFloat(valueCell.textContent.trim());


    

     // Check for duplicate label:--
      if (isDuplicateLabel(label, index)) {
        alert(`this row : ${index + 1} is the error`);
        return;
    }
    if (isNaN(label) && !isNaN(value)) {
        chartData[index] = {label, y: value }; 
       // updateLocalStorage();
    } else {
        alert("Please enter valid label and value");
    }
}

// Delete row function:--
function deleteRow(index) {
    chartData.splice(index, 1);  // Remove the row from chartData
   // updateLocalStorage();
    renderTable();  
}

// Save new data from the empty row
function saveEmptyRow(labelCell, valueCell) {
    const label = labelCell.textContent.trim();
    const value = parseFloat(valueCell.textContent.trim());




       //Check for duplicate label:--
    //    if (isDuplicateLabel(label)) {
    //     alert(`This label is duplicate.`);
    //     return;
    // }
    if (isNaN(label) && !isNaN(value)) {
        chartData.push({ label, y: value });  
        //updateLocalStorage();  
        renderTable(); 
    }
}

// Check if the entered label is a duplicate:--
function isDuplicateLabel(label, index = -1) {
    // Compare the label against all existing labels in chartData
    for (let i = 0; i < chartData.length; i++) {
        if (chartData[i].label === label && i !== index) {  // If the label matches and it's not the same row
            return true;  
        }
    }
    return false;  // No duplicate
}


function updateLocalStorage() {
    localStorage.setItem("currentChartData", JSON.stringify(chartData));
    localStorage.setItem(chartType, JSON.stringify(chartData));
}

// Save button to manually save all changes:--
document.getElementById("saveButton").addEventListener("click", () => {
   
     // Check for duplicate labels in the entire table:-
     const duplicateLabel = chartData.some((data, index) => isDuplicateLabel(data.label, index));
     if (duplicateLabel) {
         alert("There are duplicate data in the table. Please correct them before saving.");
         return;
     }
   

    updateLocalStorage();  
    alert("Data Saved Sucessfully !");
});

// View button to chart Page:--
document.getElementById("viewButton").addEventListener("click", () => {
    //updateLocalStorage();
    window.location.href = "main.html";  
});


renderTable();
// page reload:-
if (performance.navigation.type === 1) {
    
    localStorage.clear();

    window.location.href = "index.html";
}
