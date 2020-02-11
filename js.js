window.onresize = function (event) {
  console.log("recalculateMargin");
  var windowWidth = window.innerWidth;

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









let endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
let personer = [];


document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  var windowWidth = window.innerWidth;
  if (window.matchMedia("(min-width: 1000px)").matches) {
    document.querySelector("#main_container").style.margin = "0 " + (windowWidth - 1000) / 2 + "px";
  } else {
    document.querySelector("#main_container").style.margin = "0 20px";
  }

  let personer = []
  hentJSON();
}

async function hentJSON() {
  console.log("hent json");

  const response = await fetch(endpoint);
  personer = await response.json();
  visPersoner();
}

function visPersoner() {
  let dataFill = document.querySelector("#data_fill");
  let template = document.querySelector("#template");
  let dataFill2 = document.querySelector("#data_fill2");
  let template2 = document.querySelector("#template2");

  personer.feed.entry.forEach(element => {
    let klon = template.cloneNode(true).content;
    klon.querySelector(".ret #ret_billede").style.backgroundImage = `url(billeder/small/${element.gsx$billede.$t}-sm.jpg)`;
    klon.querySelector(".ret #navn").innerHTML = `${element.gsx$navn.$t}`;
    klon.querySelector(".ret #kort").textContent = `${element.gsx$kort.$t}`;
    klon.querySelector(".ret #pris").textContent = `Pris: ${element.gsx$pris.$t},-`;
    klon.querySelector(".ret #hent_id").textContent = `${element.gsx$id.$t}`;
    klon.querySelector(".ret #hent_id").style.display = "none";
    dataFill.appendChild(klon);

    let klon2 = template2.cloneNode(true).content;
    klon2.querySelector(".ret3 #ret_billede2").style.backgroundImage = `url(billeder/large/${element.gsx$billede.$t}.jpg)`;
    klon2.querySelector(".ret3 #navn2").innerHTML = `${element.gsx$navn.$t}`;
    klon2.querySelector(".ret3").classList.add(`ret${element.gsx$id.$t}`);
    klon2.querySelector(".ret3").style.display = "none";
    klon2.querySelector(".ret3 #kort2").textContent = `${element.gsx$lang.$t}`;
    klon2.querySelector(".ret3 #pris2").textContent = `Pris: ${element.gsx$pris.$t},-`;
    dataFill2.appendChild(klon2);
  });
  document.querySelectorAll(".ret").forEach(element => {
    element.addEventListener("click", lightbox);
  });
}



document.querySelectorAll(".ret3").forEach(ret => {
  ret.classList.add("pull_down");
});

function lightbox() {
  document.querySelector("#lightbox_bg").style.display = "inherit";
  document.querySelector("#lightbox_bg").classList.remove("hide_lightbox");
  document.querySelector("#lightbox_bg").classList.add("show_lightbox");
  let thisID = this.querySelector(":nth-child(4)").textContent;
  document.querySelector(`.ret${thisID}`).style.display = "flex";
  document.querySelector(`.ret${thisID}`).classList.remove("pull_down");
  document.querySelector(`.ret${thisID}`).classList.add("pull_up");
  document.querySelector("#data_fill2").style.visibility = "visible";
  document.querySelector("#data_fill2").addEventListener("click", hideLightbox);
}

function hideLightbox() {
  document.querySelector("#lightbox_bg").classList.remove("show_lightbox");
  document.querySelector("#lightbox_bg").classList.add("hide_lightbox");
  setTimeout(function () {
    document.querySelector("#lightbox_bg").style.display = "none";
    document.querySelector("#data_fill2").style.visibility = "hidden";
  }, 400);
  document.querySelectorAll(".ret3").forEach(ret => {
    ret.classList.remove("pull_up");
    ret.classList.add("pull_down");
    setTimeout(function () {
      ret.style.display = "none";
    }, 400);
  });
}



/*let imgCarouselArray = ["billeder/splash.jpg", "billeder/splash2.jpg", "billeder/splash3.jpg", "billeder/splash4.jpg", "billeder/splash5.jpg"]
let sliceFrom = 4;
let sliceTo = 5;
let slicedUrl = imgCarouselArray.slice(sliceFrom, sliceTo);
imgCarousel();


function imgCarousel() {

  if (sliceFrom < 4) {
    sliceFrom++;
    sliceTo++;
  } else {
    sliceFrom = 0;
    sliceTo = 1;
  }
  slicedUrl = imgCarouselArray.slice(sliceFrom, sliceTo);

  document.querySelector("#splash").style.backgroundImage = `url(${slicedUrl})`;

  setTimeout(imgCarousel, 2000);
}*/

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
