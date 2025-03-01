function handleFile() {
    const fileInput = document.getElementById("excelFile").files[0];
    if (!fileInput) {
        alert("Please select an Excel file!");
        return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(fileInput);
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get first sheet name
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Display in table
        displayTable(jsonData);
    };
}

function displayTable(data) {
    const tableHead = document.querySelector("#excelTable thead");
    const tableBody = document.querySelector("#excelTable tbody");

    tableHead.innerHTML = "";
    tableBody.innerHTML = "";

  
    let headers = data[0];
    let headerRow = document.createElement("tr");
    headers.forEach(header => {
        let th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

   
    data.slice(1).forEach(row => {
        let tr = document.createElement("tr");
        row.forEach(cell => {
            let td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}