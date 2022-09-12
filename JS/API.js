const url = "https://mario-kart-tour-api.herokuapp.com/api/v1/drivers";
const tbody = document.getElementById("bodyTable");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const input = document.getElementById("searchInput");
const boxMustache = document.getElementById("checkMustache");
let filterMustache
let data

fetching()

//FETCH THE API DATA

function fetching(){
fetch(url).then(response => {
  return response.json()
}).then(result => {  
  data = result
  console.log(data)
})
setTimeout(displayTable, 2000);
}

//DISPLAY THE WHOLE API DATA

function displayTable(){
data.forEach((driver, i) => {
  console.log('driver', driver)

  //create Elements
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");

//define the inner HTML
td1.innerHTML = i + 1;
td2.innerHTML = driver.name;
td3.innerHTML = driver.debut_tour;
td4.innerHTML = driver.special_skill;

//style the rows and columns
td1.setAttribute("class", "columStyle");
    td1.setAttribute("id", "countStyle");
    td2.setAttribute("class", "columStyle");
    td3.setAttribute("class", "columStyle");
    td4.setAttribute("class", "columStyle");
    tr.setAttribute("class", "rows");

  //append everything
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  tbody.appendChild(tr);
})
const lakitu = document.getElementById("LakituDiv");
  lakitu.style.display = "none";
}

//FUNCTION SEARCH BAR WITH SEARCH BUTTON

searchBtn.addEventListener("click", searchBar);

function searchBar() {
  // Declare variables
  let filter, tr, td, i, txtValue;
  filter = input.value.toUpperCase();
  tr = tbody.getElementsByTagName("tr");
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

//FUNCTION CLEAR BUTTON

clearBtn.addEventListener("click", clearing);

function clearing() {
  tr = tbody.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    if (tr[i].style.display = "none") {
      tr[i].style.display = "";
    }
  }
  input.value = "";
}

//FUNCTION CHECKBOX MUSTACHE

boxMustache.addEventListener("click", showMustache)

function showMustache(){
  if(boxMustache.checked == true){
    filterMustache = data.filter(driver => driver.mustache == true);
    //console.log(filterMustache)
    tr = tbody.getElementsByTagName("tr");
    for(let i = 0; i < filterMustache.length; i++){
      //console.log(filterMustache[i].name)
      for (let j = i; j < tr.length; j++) {
        td = tr[j].getElementsByTagName("td")[1];
        if(filterMustache[i].name == td.innerHTML){
          tr[j].style.display = "";
        } else {
          tr[j].style.display = "none";
        }}
    }
    /*filterMustache.forEach(must => {
      console.log(must.name)
    })
    tr = tbody.getElementsByTagName("tr");
    console.log(tr[1])
    td = tr[1].getElementsByTagName("td")[1];
    console.log(td)
    console.log(td.innerHTML)*/
   
   
   /* 
 filterMustache.forEach(must => {
      
      }
    })
  } else {
    for (i = 0; i < tr.length; i++) {
      tr[i].style.display = "none";
      }*/
  }
}