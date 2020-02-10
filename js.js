window.onresize = function (event) {
  console.log("recalculateMargin");
  var windowWidth = window.innerWidth;

  if (window.matchMedia("(min-width: 1000px)").matches) {
    document.querySelector("#main_container").style.margin = "0 " + (windowWidth - 1000) / 2 + "px";
  } else {
    document.querySelector("#main_container").style.margin = "0 20px";
  }
}




let endpoint = "https://spreadsheets.google.com/feeds/list/1svx2s3B-VtpCUMaaTbVaEM2ds4PkSFW3YE1Upo-JpMs/od6/public/values?alt=json";
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

  console.log(response);
}

function visPersoner() {
  let dataFill = document.querySelector("#data_fill");
  let template = document.querySelector("#template");

  personer.feed.entry.forEach(element => {
    let klon = template.cloneNode(true).content;
    klon.querySelector("#ret #ret_billede").style.backgroundImage = `url(${element.gsx$lbillede.$t})`;
    klon.querySelector("#ret #navn").innerHTML = `${element.gsx$navn.$t}`;
    klon.querySelector("#ret #kort").textContent = `${element.gsx$kort.$t}`;
    klon.querySelector("#ret #pris").textContent = `Pris: ${element.gsx$pris.$t},-`;
    dataFill.appendChild(klon);
  });
}
