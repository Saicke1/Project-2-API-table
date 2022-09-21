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
let data2

//FETCH THE API DATA -----------------------------------------------------------------------------

function fetching(){
fetch(url).then(response => {
  return response.json()
}).then(result => {  
  data = result
  //console.log(data)
  displayTable(data);
})}

fetching();

/*
const fetch2 = async function diff(){
  const resp = await fetch(url);
  data2 = await resp.json();
  return data2
};

fetch2();

async function control(){
 const newData = await fetch2();

 //create the table
 displayTable(newData);
}

control();
*/

//DISPLAY THE WHOLE API DATA -----------------------------------------------------------------------

function displayTable(input){
input.forEach((driver) => {
  //console.log('driver', driver)

  //create Elements
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");
  const img_chara = document.createElement("img");
  const img_skill = document.createElement("img");



//define the inner HTML/Content
for(let g = 0; g < addInfo.length; g++){
if(driver.name == addInfo[g].name && addInfo[g].img_chara != ""){
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

td4.innerHTML = "<br>" + driver.rarity;

td5.innerHTML = driver.special_skill + "<br>";
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
tr.setAttribute("onclick", "playAudio()");
td1.setAttribute("class", "columStyle");
td2.setAttribute("class", "columStyle");
td3.setAttribute("class", "columStyle");
td4.setAttribute("class", "columStyle");
td4.classList.add("hiding");
td5.setAttribute("class", "columStyle");
img_chara.setAttribute("class", "imageChara");
img_skill.setAttribute("class", "imageSkill");    

  //append everything
  td1.appendChild(img_chara);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  td5.appendChild(img_skill);
  tr.appendChild(td5);

  tbody.appendChild(tr);
})
const lakitu = document.getElementById("LakituDiv");
  lakitu.style.display = "none";
}

//CODE FOR CHECKBOXES WITH LMS ---------------------------------------------------------------------------

//set all checkboxes in a variable
let checkboxes = document.querySelectorAll("input[type=checkbox]");

//Event for every change on those checkboxes
checkboxes.forEach(changed => {
  changed.addEventListener("change", showChecked)
})



//get all the value, if they are checked
function showChecked() {
  let checkedValues = [];
  checkboxes.forEach(checked =>{
    if(checked.checked){
      let dataValue = checked.value;
      checkedValues.push(dataValue);
    }
    return checkedValues
  })
  if(checkedValues.length === 0){
    tbody.innerHTML = "";
    displayTable(data);
    searchBar();
    showSelected()
  } else {
  createCheckboxTable(checkedValues);}
} 

function createCheckboxTable(input){
  const filterDriver = data.filter(driver => {
    const trueDriver = input.filter(value => {
      //console.log('driver[value]', driver[value])
      return driver[value] == true
    })
    //console.log('trueDriver', trueDriver)
    return trueDriver.length == input.length
  })

//console.log('filterDriver', filterDriver) 
/*
  const arrayDriver = [];
  //check each checked value and if there is a hit and then do the filtering
  for(let i = 0; i<input.length; i++){
  if(input[i] === "mustache"){
    arrayDriver.push(filteredMustache());
  } else if (input[i] === "hat"){
    arrayDriver.push(filteredHat());
  } else if(input[i] === "horns"){
    arrayDriver.push(filteredHorns());
  } else {arrayDriver.push(filteredGloves());}
}
  
//clean up this new array

const cleanedArray = [];
const checkArray = [];
const doubledNames = [];

//if you have more then one filtered information, then create an array of the names which exist in each filter
if(arrayDriver.length == 1){
  arrayDriver[0].forEach(onlyonecheck =>{
    cleanedArray.push(onlyonecheck);
  })
} else {
  arrayDriver[0].forEach(firstarray =>{
    checkArray.push(firstarray.name)
  })
  for(let g=1; g<arrayDriver.length; g++){
    doubledNames.splice(0, doubledNames.length);
    arrayDriver[g].forEach(checkednames => {
      if(checkArray.includes(checkednames.name)){
        doubledNames.push(checkednames.name)
      }
    })
    checkArray.splice(0, checkArray.length);
    for(let k of doubledNames){
      checkArray.push(k);
    }
  }
}
//array of names, which are fullfill every checked checkbox condition
//console.log('Final checkArray', checkArray);

//compare the names with the first filtered
if(checkArray.length == 0){
  tbody.innerHTML = "";
} else{
arrayDriver[0].forEach(finalname => {
  if(checkArray.includes(finalname.name)){
    cleanedArray.push(finalname);
  }
})
}
//new array with all the datas of the hit checkboxes
console.log('cleanedArray', cleanedArray)
*/
tbody.innerHTML = "";
displayTable(filterDriver);
searchBar();
showSelected();}

//Each filter for each checkbox
function filteredMustache(){ 
  filterMustache = data.filter(driver => driver.mustache == true);
  return filterMustache
}

function filteredHat(){
  filterHat = data.filter(driver => driver.hat == true);
  return filterHat;
}

function filteredHorns(){
  filterHorns = data.filter(driver => driver.horns == true);
  return filterHorns;
}

function filteredGloves(){
  filterGloves = data.filter(driver => driver.gloves == true);
  return filterGloves;
}

//FUNCTION SEARCH BAR WITH SEARCH BUTTON -----------------------------------------------------------------------

searchBtn.addEventListener("click", searchBar);
//Event Listener for pressing the Enter Key
input.addEventListener("keypress", function(press){
  if(press.key === "Enter"){
    press.preventDefault();
    searchBar();
  }
});

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

//FUNCTION CLEAR BUTTON -----------------------------------------------------------------------------------

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

//FUNCTION SELECT TO SORT ALPHABETICAL -----------------------------------------------------------------------
document.getElementById("mySort").addEventListener("change", showSelected);

function showSelected(){
  if(this.value == "a-z"){sortFromA();}
  else if(this.value == "z-a"){sortFromZ();}
  else if(this.value == "rare"){sortFromRare();}
}

function sortFromA(){
  tr = tbody.getElementsByTagName("tr");
  let switching
  switching = true;
  console.log("sortierung")
  while(switching){
    switching = false;
  for(let i = 0; i<(tr.length - 1); i++){
  td1 = tr[i].getElementsByTagName("td")[1];
  td2 = tr[i + 1].getElementsByTagName("td")[1];
  if(td1.textContent.toLowerCase() > td2.textContent.toLowerCase()){
    tbody.insertBefore(tr[i + 1], tbody.children[i]);
    switching = true;
    break;
  }
  }
  }
}

function sortFromZ(){
  tr = tbody.getElementsByTagName("tr");
  let switching
  switching = true;
  console.log("sortierung")
  while(switching){
    switching = false;
  for(let i = 0; i<(tr.length - 1); i++){
  td1 = tr[i].getElementsByTagName("td")[1];
  td2 = tr[i + 1].getElementsByTagName("td")[1];
  if(td1.textContent.toLowerCase() < td2.textContent.toLowerCase()){
    tbody.insertBefore(tr[i + 1], tbody.children[i]);
    switching = true;
    break;
  }
  }
  }
}

function sortFromRare(){
  tr = tbody.getElementsByTagName("tr");
  let switching
  switching = true;
  console.log("sortierung")
  while(switching){
    switching = false;
  for(let i = 0; i<(tr.length - 1); i++){
  td1 = tr[i].getElementsByTagName("td")[3];
  td2 = tr[i + 1].getElementsByTagName("td")[3];
  if(td1.textContent.toLowerCase() > td2.textContent.toLowerCase()){
    tbody.insertBefore(tr[i + 1], tbody.children[i]);
    switching = true;
    break;
  }
  }}

  let switch2
  switch2 = true;
  while(switch2){
    switch2 = false;
    for(let l=0; l<(tr.length - 1); l++){
      td1 = tr[l].getElementsByTagName("td")[3];
      td2 = tr[l + 1].getElementsByTagName("td")[3];
      if(td1.textContent.toLowerCase() == "normal" && td1.textContent.toLowerCase() < td2.textContent.toLowerCase()){
        tbody.insertBefore(tr[l + 1], tbody.children[l]);
        switch2 = true;
        break;
      }
    }
  }
}

//FUNCTION FOR AUDIO FROM BOWSER -----------------------------------------------------------------------

const audio = document.getElementById("bowserAudio");
const bowserBox = document.getElementById("popUpBowser");

function playAudio(){
  if(bowserBox.style.display === 'flex'){
    bowserBox.style.display = 'none';
  } else{
  bowserBox.style.display = 'flex';
  audio.play();}}