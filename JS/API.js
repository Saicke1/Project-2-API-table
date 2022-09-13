const url = "https://mario-kart-tour-api.herokuapp.com/api/v1/drivers";
const addInfo = additional;
const tbody = document.getElementById("bodyTable");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const input = document.getElementById("searchInput");
const boxMustache = document.getElementById("checkMustache");
const boxHat = document.getElementById("checkHat");
let filterMustache
let data

fetching()

//FETCH THE API DATA

function fetching(){
fetch(url).then(response => {
  return response.json()
}).then(result => {  
  data = result
  //console.log(data)
})
setTimeout(displayTable, 3000);
}

//DISPLAY THE WHOLE API DATA

function displayTable(){
data.forEach((driver, i) => {
  //console.log('driver', driver)

  //create Elements
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const img_chara = document.createElement("img");
  const img_skill = document.createElement("img");

//define the inner HTML/Content
for(let g = 0; g < addInfo.length; g++){
if(driver.name == addInfo[g].name){
img_chara.src = addInfo[g].img_chara;
break;
} else {
  img_chara.src = "../Images/question.png";
}
}

td2.innerHTML = "<br>" + driver.name;

try{
  const debutGame = driver.level_one_favorite_courses[0].debut_game
  td3.innerHTML = "<br>" + debutGame;
} catch{
  td3.innerHTML = "<br>" + "No Debut Game";
}

td4.innerHTML = driver.special_skill + "<br>";
for(let d = 0; d < addInfo.length; d++){
  if(driver.name == addInfo[d].name){
  img_skill.src = addInfo[d].img_skill;
  break;
  } else {
    img_skill.src = "../Images/question.png";
  }
}


//style the rows and columns
tr.setAttribute("class", "rows");
td1.setAttribute("class", "columStyle");
td2.setAttribute("class", "columStyle");
td3.setAttribute("class", "columStyle");
td4.setAttribute("class", "columStyle");
img_chara.setAttribute("class", "imageChara");
img_skill.setAttribute("class", "imageSkill");    

  //append everything
  td1.appendChild(img_chara);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  td4.appendChild(img_skill);
  tr.appendChild(td4);

  tbody.appendChild(tr);
})
const lakitu = document.getElementById("LakituDiv");
  lakitu.style.display = "none";
}

//FUNCTION CHECKBOX MUSTACHE

boxMustache.addEventListener("click", showMustache)

function showMustache(){
  if(boxMustache.checked == true){
    filterMustache = data.filter(driver => driver.mustache == true);
    console.log(filterMustache)
    tr = tbody.getElementsByTagName("tr");
    for(let i = 0; i < filterMustache.length; i++){
      for (let j = i; j < tr.length; j++) {
        td = tr[j].getElementsByTagName("td")[1];
        if(filterMustache[i].name == td.textContent && tr[j].className !== 'checkedMustache'){
          tr[j].classList.add("checkedMustache");
          //console.log(tr[j]);
        }}
    }
    for(let h = 0; h < tr.length; h++){
      if(tr[h].classList.contains("checkedMustache") && tr[h].style.display == ""){
        tr[h].style.display = "";
      } else {
        tr[h].style.display = "none";
      }
    }
  } else {
    tr = tbody.getElementsByTagName("tr");
    for(let s = 0; s < tr.length; s++){
      if(tr[s].classList.contains("checkedHat")){
        tr[s].style.display = "";
        tr[s].classList.remove = ("checkedMustache");
      } else {
        tr[s].style.display = "none";
        tr[s].classList.remove = ("checkedMustache");
      }
    }
  }
}

//FUNCTION CHECKBOX HAT

boxHat.addEventListener("click", showHat)

function showHat(){
  if(boxHat.checked == true){
    filterHat = data.filter(driver => driver.hat == true);
    console.log(filterHat)
    tr = tbody.getElementsByTagName("tr");
    for(let i = 0; i < filterHat.length; i++){
      for (let j = i; j < tr.length; j++) {
        td = tr[j].getElementsByTagName("td")[1];
        if(filterHat[i].name == td.textContent && tr[j].className !== 'checkedHat'){
          tr[j].classList.add("checkedHat");
          console.log(tr[j]);
        }}
    }
    for(let h = 0; h < tr.length; h++){
      if(tr[h].classList.contains("checkedHat") && tr[h].style.display == ""){
        tr[h].style.display = "";
        //console.log(tr[h])
      } else {
        tr[h].style.display = "none";
      }
    }
  } else {
    tr = tbody.getElementsByTagName("tr");
    for(let s = 0; s < tr.length; s++){
      if(tr[s].classList.contains("checkedMustache")){
        tr[s].style.display = "";
        tr[s].classList.remove = ("checkedHat");
      } else {
        tr[s].style.display = "none";
        tr[s].classList.remove = ("checkedHat");
      }
    }
  }
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