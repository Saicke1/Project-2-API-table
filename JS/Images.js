const url = "https://mario-kart-tour-api.herokuapp.com/api/v1/drivers";
const addInfo = additional;
let data

const anything = async function got(){
  const resp = await fetch(url);
  data = await resp.json();
  console.log('data', data)
  return data
}


async function control(){
  const newData = await anything();
  console.log('newData', newData)

//create the cards
createCards(newData);
}

control();

function createCards(input){
  const cardHolder = document.getElementById("cardHolder");
input.forEach((drivers, i) => {
  //create elements
  const cardSkelett = document.createElement("div");
  const imgWrap = document.createElement("div");
  const image = document.createElement("img");
  const cardBody = document.createElement("div");
  const cardTitle = document.createElement("h5");
  const cardText = document.createElement("p");
  const reference = document.createElement("a");

  //define content
  for(let g = 0; g < addInfo.length; g++){
    if(drivers.name == addInfo[g].name && addInfo[g].img_chara != ""){
    image.src = addInfo[g].img_chara;
    break;
    } else {
      image.src = "../Images/question.png";
    }
  }

  cardTitle.innerHTML = drivers.name;
  cardText.innerHTML = additional[i].text;

  reference.innerHTML = "More information";
  for(let h = 0; h < addInfo.length; h++){
    if(drivers.name == addInfo[h].name && addInfo[h].ref != ""){
    reference.href = addInfo[h].ref;
    break;
    }
  }

  //style and give classes
  cardSkelett.classList.add("card");
  cardSkelett.style = "width: 18rem";
  imgWrap.classList.add("centerImg");
  image.classList.add("card-img-top");
  image.classList.add("image-cards");
  image.alt = drivers.name;
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title");
  cardText.classList.add("card-text");
  reference.classList.add("btn");
  reference.classList.add("btn-primary");

  //append everything
  imgWrap.appendChild(image);
  cardSkelett.appendChild(imgWrap);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(reference);
  cardSkelett.appendChild(cardBody);
  cardHolder.appendChild(cardSkelett);
});
}