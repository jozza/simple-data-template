"use strict";

function matrix_to_table(header,tableData) {
  let table = document.createElement('table');
  // table.setAttribute("border", "1px");
  table.classList.add("table-sm","table-bordered")
  let tableHeader = document.createElement('thead');
  let tableBody = document.createElement('tbody');
  // Add checkcboxes above
  let row = document.createElement('tr');
  let i = 0;
  header.forEach(function(cellData) {
    let cell = document.createElement('td');
    // checkbox.addEventListener('onclick', "alert('hej');", false);
    cell.innerHTML = "<strong>"+cellData+"</strong>"
    cell.classList.add("border")
    row.appendChild(cell);
    i++;
  });
  tableHeader.appendChild(row);
  // tableBody.appendChild(row);

  // Add data
  // console.log("tableData",tableData)
  tableData.forEach(function(rowData) {
    // console.log(rowData)
    // let row = document.createElement('tr');
    row = document.createElement('tr');
    i = 0;
    rowData.forEach(function(cellData) {
      let cell = document.createElement('td');
      cell.classList.add("border")
      // cell.setAttribute("class", "datacol_"+i);
      // cell.appendChild(document.createTextNode(cellData));
      let inside = document.createElement('div');
      inside.setAttribute("class", "datacol_"+i);
      inside.appendChild(document.createTextNode(cellData));
      cell.appendChild(inside);
      row.appendChild(cell);
      i++;
    });

    tableBody.appendChild(row);
  });
  table.appendChild(tableHeader);
  table.appendChild(tableBody);
  return table;
  // document.body.appendChild(table);
}
function object_matrix_to_table(header,tableData) {
  let table = document.createElement('table');
  // table.setAttribute("border", "1px");
  table.classList.add("table-sm","table-bordered")
  let tableHeader = document.createElement('thead');
  let tableBody = document.createElement('tbody');
  // Add checkcboxes above
  let row = document.createElement('tr');
  let i = 0;
  header.forEach(function(cellData) {
    let cell = document.createElement('td');
    cell.innerHTML = "<strong>"+cellData+"</strong>"
    cell.classList.add("border")
    row.appendChild(cell);
    i++;
  });
  tableHeader.appendChild(row);
  // tableBody.appendChild(row);

  // Add data
  tableData.forEach(function(rowData) {
    console.log("rowData",rowData)
    // let row = document.createElement('tr');
    // console.log("rowData",rowData[1].id,rowData)
    row = document.createElement('tr');

    // row.id = rowData[1].id
    // for (const [c,v] of Object.entries(rowData[0].classes)) {
    //   row.style.display = v
    // }

    i = 0;
    rowData.forEach(function(cellData) {
      let cell = document.createElement('td')
      cell.classList.add("border")
      // cell.setAttribute("class", "datacol_"+i)
      // cell.appendChild(document.createTextNode(cellData))
      let inside = document.createElement('div')
      inside.setAttribute("class", "datacol_"+i)
      inside.style['text-align'] = cellData['text-align']
      // inside.appendChild(document.createTextNode(cellData.text))
      inside.innerHTML = cellData.text
      // inside.appendChild(document.createTextNode(cellData.text))
      cell.appendChild(inside);
      row.appendChild(cell);
      i++;
    });

    tableBody.appendChild(row);
  });
  table.appendChild(tableHeader);
  table.appendChild(tableBody);
  return table;
  // document.body.appendChild(table);
}

function o_matrix_to_table(tableData) {
  let table = document.createElement('table');
  const header = new Set(tableData.flatMap(Object.keys))
  table.classList.add("table-sm","table-bordered")
  let tableHeader = document.createElement('thead');
  let tableBody = document.createElement('tbody');
  let row = document.createElement('tr');
  let i = 0;
  header.forEach(function(cellData) {
    let cell = document.createElement('td');
    cell.innerHTML = "<strong>"+cellData+"</strong>"
    cell.classList.add("border")
    row.appendChild(cell);
    i++;
  });
  tableHeader.appendChild(row);

  // Add data
  tableData.forEach(function(rowData) {
    row = document.createElement('tr');
    i = 0;
    for (const k of header) {
      let cell = document.createElement('td')
      cell.classList.add("border")
      let inside = document.createElement('div')
      inside.setAttribute("class", "datacol_"+i)
      if (rowData.hasOwnProperty(k)) {
        inside.innerHTML = rowData[k]
      } else {
        inside.innerHTML = ""
      }
      cell.appendChild(inside);
      row.appendChild(cell);
      i++
    }
  
    tableBody.appendChild(row);
  });
  table.appendChild(tableHeader);
  table.appendChild(tableBody);
  return table;
}


function matrix_to_table_action(header,tableData,action) {
  let table = document.createElement('table');
  table.classList.add("table-sm","table-bordered")
  let tableHeader = document.createElement('thead');
  let tableBody = document.createElement('tbody');
  let row = document.createElement('tr');
  let i = 0;
  header.forEach(function(cellData) {
    let cell = document.createElement('td');
    // checkbox.addEventListener('onclick', "alert('hej');", false);
    cell.innerHTML = "<strong>"+cellData+"</strong>"
    cell.classList.add("border")
    row.appendChild(cell);
    i++;
  });
  tableHeader.appendChild(row);

  // Add data
  tableData.forEach(function(rowData) {
    // let row = document.createElement('tr');
    row = document.createElement('tr');
    i = 0;
    rowData.forEach(function(cellData) {
      let cell = document.createElement('td');
      cell.classList.add("border")
      // cell.setAttribute("class", "datacol_"+i);
      // cell.appendChild(document.createTextNode(cellData));
      let inside = document.createElement('div');
      inside.setAttribute("class", "datacol_"+i);
      inside.appendChild(document.createTextNode(cellData));
      cell.appendChild(inside);
      row.appendChild(cell);
      i++;
    });

    tableBody.appendChild(row);
  });
  table.appendChild(tableHeader);
  table.appendChild(tableBody);
  return table;
}
