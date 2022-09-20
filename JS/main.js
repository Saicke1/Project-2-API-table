var btnClass = document.getElementsByClassName("showButton");

for (i = 0; i < btnClass.length; i++) {
  btnClass[i].addEventListener("click", function () {
    var Text = document.getElementById("invisibleText");
    if (Text.style.display === "block") {
      Text.style.display = "none";
    } else {
      Text.style.display = "block";
    }
  });
}

var btnId = document.getElementById("welcomeButton");

btnId.addEventListener("click", function clicking() {
  const btnText = document.getElementById("welcomeButton");
  //console.log(btnText.value);
  if (btnText.value === "Show More!") {
    btnText.innerHTML = "Show Less!";
    btnText.value = "Show Less!";
    btnText.style.backgroundColor = "#ff6c7e";
  } else {
    btnText.innerHTML = "Show More!";
    btnText.value = "Show More!";
    btnText.style.backgroundColor = "#fbd000";
  }
});
