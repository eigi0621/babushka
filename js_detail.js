window.onresize = function (event) {
  let windowWidth = window.innerWidth;
  if (window.matchMedia("(min-width: 1000px)").matches) {
    document.querySelector("#main_container").style.margin = "0 " + (windowWidth - 1000) / 2 + "px";
  } else {
    document.querySelector("#main_container").style.margin = "0";
  }
}

function resizeWindow() {
  let windowWidth = window.innerWidth;
  if (window.matchMedia("(min-width: 1000px)").matches) {
    document.querySelector("#main_container").style.margin = "0 " + (windowWidth - 1000) / 2 + "px";
  } else {
    document.querySelector("#main_container").style.margin = "0";
  }
}

/*window.onscroll = function (e) {
  var speedOfImg = .2;
  var imgSpeed = window.pageYOffset * speedOfImg;
  document.querySelector("#splash").style.transform = "translateY(" + imgSpeed + "px)";
  document.querySelector("#space_top").style.transform = "translateY(" + imgSpeed + "px)";
}*/








const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
let retter = [];
let popUp = document.querySelector("#popup");

document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  var windowWidth = window.innerWidth;
  if (window.matchMedia("(min-width: 1000px)").matches) {
    document.querySelector("#main_container").style.margin = "0 " + (windowWidth - 1000) / 2 + "px";
  } else {
    document.querySelector("#main_container").style.margin = "0 20px";
  }

  let retter = []
  hentJSON();

  resizeWindow();
}

async function hentJSON() {
  console.log("hent json");

  const response = await fetch(endpoint);
  retter = await response.json();
  visRetter();
}

function visRetter() {
  console.log("visRetter");
  let dataFill = document.querySelector("#data_fill");
  let template = document.querySelector("#template");

  retter.feed.entry.forEach(element => {
    if (element.gsx$id.$t == id) {
      popUp.querySelector(".ret_popup #popup_billede").style.backgroundImage = `url(billeder/large/${element.gsx$billede.$t}.jpg)`;
      popUp.querySelector(".ret_popup #popup_navn").textContent = `${element.gsx$navn.$t}`;
      popUp.querySelector(".ret_popup").style.display = "flex";
      popUp.querySelector(".ret_popup #popup_lang").textContent = `${element.gsx$lang.$t}`;
      popUp.querySelector(".ret_popup #popup_pris").textContent = `Pris: ${element.gsx$pris.$t},-`;
      popUp.style.visibility = "visible";
      popUp.style.position = "relative";
      popUp.style.display = "inherit";
      popUp.style.height = "auto";
      document.querySelector("footer").style.position = "fixed";
      document.querySelector("footer").style.bottom = "0";
      let windowWidth = window.innerWidth;
      document.querySelector("footer").style.left = (windowWidth - 1000) / 2 + "px";
    }
  });
  resizeWindow();
}

document.querySelector("button").addEventListener("click", () => {
  location.href = "index_copy.html";
});




document.querySelector("#burger").addEventListener("click", menuDown);

function menuDown() {
  document.querySelector("#burger").classList.remove("burger_up");
  document.querySelector("#burger").classList.add("burger_down");
  document.querySelector("#nav_bg").classList.remove("burger_up");
  document.querySelector("#nav_bg").classList.add("burger_down");
  document.querySelector("#nav3").classList.remove("burger_up");
  document.querySelector("#nav3").classList.add("burger_down");


  document.querySelector("#burger").removeEventListener("click", menuDown);
  document.querySelector("#burger").addEventListener("click", menuUp);
  document.querySelector("#nav_bg").addEventListener("click", menuUp);
}

function menuUp() {
  document.querySelector("#burger").classList.remove("burger_down");
  document.querySelector("#burger").classList.add("burger_up");
  document.querySelector("#nav_bg").classList.remove("burger_down");
  document.querySelector("#nav_bg").classList.add("burger_up");
  document.querySelector("#nav3").classList.remove("burger_down");
  document.querySelector("#nav3").classList.add("burger_up");


  document.querySelector("#nav_bg").removeEventListener("click", menuUp);
  document.querySelector("#burger").removeEventListener("click", menuUp);
  document.querySelector("#burger").addEventListener("click", menuDown);
}
