window.onresize = function (event) {
  let windowWidth = window.innerWidth;
  if (window.matchMedia("(min-width: 1000px)").matches) {
    document.querySelector("#main_container").style.margin = "0 " + (windowWidth - 1000) / 2 + "px";
  } else {
    document.querySelector("#main_container").style.margin = "0";
  }
}

function resizeWindow () {
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
let filter = "alle";
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

  document.querySelectorAll("#sorter_section button").forEach(knap => {
    knap.addEventListener("click", sorterRetter)
  });


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

  dataFill.textContent = "";

  retter.feed.entry.forEach(element => {
    if (element.gsx$kategori.$t == filter || filter == "alle") {
      let klon = template.cloneNode(true).content;
      klon.querySelector(".ret #ret_billede").style.backgroundImage = `url("billeder/small/${element.gsx$billede.$t}-sm.jpg")`;
      klon.querySelector(".ret #navn").innerHTML = `${element.gsx$navn.$t}`;
      klon.querySelector(".ret #kort").textContent = `${element.gsx$kort.$t}`;
      klon.querySelector(".ret #pris").textContent = `Pris: ${element.gsx$pris.$t},-`;
      klon.querySelector(".ret #hent_id").textContent = `${element.gsx$id.$t}`;
      klon.querySelector(".ret #hent_id").style.display = "none";
      klon.querySelector(".ret").addEventListener("click", () => {
        location.href = `detail.html?id=${element.gsx$id.$t}`;
      });
      dataFill.appendChild(klon);
    }
  });

  resizeWindow();
}

function sorterRetter() {
  console.log("sorterRetter");
  filter = this.dataset.kategori;
  console.log(filter + "filter");
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  visRetter();
}







document.querySelectorAll(".ret_popup").forEach(ret => {
  ret.classList.add("pull_down");
});

function lightbox(element) {
  document.querySelector("#lightbox_bg").style.display = "inherit";
  document.querySelector("#lightbox_bg").classList.remove("hide_lightbox");
  document.querySelector("#lightbox_bg").classList.add("show_lightbox");

  popUp.querySelector(".ret_popup").classList.remove("pull_down");
  popUp.querySelector(".ret_popup").classList.add("pull_up");
  popUp.querySelector(".ret_popup #popup_billede").style.backgroundImage = `url(billeder/large/${element.gsx$billede.$t}.jpg)`;
  popUp.querySelector(".ret_popup #popup_navn").textContent = `${element.gsx$navn.$t}`;
  popUp.querySelector(".ret_popup").style.display = "flex";
  popUp.querySelector(".ret_popup #popup_lang").textContent = `${element.gsx$lang.$t}`;
  popUp.querySelector(".ret_popup #popup_pris").textContent = `Pris: ${element.gsx$pris.$t},-`;
  popUp.style.visibility = "visible";
  popUp.addEventListener("click", hideLightbox);
}

function hideLightbox() {
  document.querySelector("#lightbox_bg").classList.remove("show_lightbox");
  document.querySelector("#lightbox_bg").classList.add("hide_lightbox");
  setTimeout(function () {
    document.querySelector("#lightbox_bg").style.display = "none";
    document.querySelector("#popup").style.visibility = "hidden";
  }, 400);
  document.querySelectorAll(".ret_popup").forEach(ret => {
    ret.classList.remove("pull_up");
    ret.classList.add("pull_down");
    setTimeout(function () {
      ret.style.display = "none";
    }, 400);
  });
}




let splash = document.querySelector("#splash");
let splash2 = document.querySelector("#splash2");
let splash3 = document.querySelector("#splash3");
let splash4 = document.querySelector("#splash4");
let splash5 = document.querySelector("#splash5");

imgCarousel();

function imgCarousel() {
  setTimeout(function () {
    splash.classList.remove("splash_left");
    splash.classList.add("splash_right");
    splash2.classList.remove("splash_right");
    splash2.classList.add("splash_left");
    setTimeout(function () {
      splash2.classList.remove("splash_left");
      splash2.classList.add("splash_right");
      splash3.classList.remove("splash_right");
      splash3.classList.add("splash_left");
      setTimeout(function () {
        splash3.classList.remove("splash_left");
        splash3.classList.add("splash_right");
        splash4.classList.remove("splash_right");
        splash4.classList.add("splash_left");
        setTimeout(function () {
          splash4.classList.remove("splash_left");
          splash4.classList.add("splash_right");
          splash5.classList.remove("splash_right");
          splash5.classList.add("splash_left");
          setTimeout(function () {
            splash5.classList.remove("splash_left");
            splash5.classList.add("splash_right");
            splash.classList.remove("splash_right");
            splash.classList.add("splash_left");

            imgCarousel();
          }, 3000);
        }, 3000);
      }, 3000);
    }, 3000);
  }, 3000);
}



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
