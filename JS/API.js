console.log(drivers);
var data = drivers.name;
console.log(drivers[0]); //shows array of first character
var firstName = drivers[0].name;
console.log(firstName);
console.log(typeof firstName);

renderTable(drivers);

function renderTable(driversList) {
  var tbody = document.getElementById("tableContainer");

  for (var i = 0; i < driversList.length; i++) {
    var tr = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.innerHTML = i + 1;

    var td2 = document.createElement("td");
    td2.innerHTML = driversList[i].name;

    var td3 = document.createElement("td");
    td3.innerHTML = driversList[i].debut_tour;

    var td4 = document.createElement("td");
    td4.innerHTML = driversList[i].special_skill;

    td1.setAttribute("class", "columStyle");
    td1.setAttribute("id", "countStyle");
    td2.setAttribute("class", "columStyle");
    td3.setAttribute("class", "columStyle");
    td4.setAttribute("class", "columStyle");
    tr.setAttribute("class", "rows");

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tbody.appendChild(tr);
  }
}

function filterByName() {
  var input = document.getElementById("searchInput");
  var filteredlist;

  renderTable(filteredlist);
}
//Function for searching!
function searchBar() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table2 = document.getElementById("tableContainer");
  console.log("table", table2);
  tr = table2.getElementsByTagName("tr");
  console.log("tr", tr);
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

var searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", searchBar);

var clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearing);
var tbody = document.getElementById("tableContainer");
var thead = document.getElementById("thread");

function clearing() {
  var check = document.getElementById("tableContainer");
  var check2 = document.getElementById();
  console.log(length);
  //thead.nextElementSibling.innerHTML = "";
}
