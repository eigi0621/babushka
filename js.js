let endpoint = "https://spreadsheets.google.com/feeds/list/1XWWbfWszD7f4jHqp51V_oT3pkHuR-ceEUw4YtrvK7F0/od6/public/values?alt=json";
    let personer = [];


    document.addEventListener("DOMContentLoaded", start);

    function start() {
      console.log("start");
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
        if (element.gsx$sex.$t == "k") {
          element.gsx$sex.$t = "Kvinde";
        }
        if (element.gsx$sex.$t == "m") {
          element.gsx$sex.$t = "Mand";
        }
        let klon = template.cloneNode(true).content;
        klon.querySelector("#personer #navn").textContent = `${element.gsx$navn.$t} ${element.gsx$efternavn.$t}`;
        klon.querySelector("#personer img").src = `${element.gsx$billede.$t}`;
        klon.querySelector("#personer #sex").textContent = `Køn: ${element.gsx$sex.$t}`;
        klon.querySelector("#personer #alder").textContent = `Alder: ${element.gsx$alder.$t} år`;
        klon.querySelector("#personer #religion").textContent = `Religion: ${element.gsx$religion.$t}`;
        klon.querySelector("#personer #hobby").textContent = `Hobby: ${element.gsx$hobby.$t}`;
        klon.querySelector("#personer #kaeledyr").textContent = `Kæledyr: ${element.gsx$kaeledyr.$t}`;
        klon.querySelector("#personer #job").textContent = `Job: ${element.gsx$job.$t}`;
        klon.querySelector("#personer #by").textContent = `By: ${element.gsx$by.$t}`;
        klon.querySelector("#personer #rpc").textContent = `RPC: ${element.gsx$rpc.$t}`;
        dataFill.appendChild(klon);
      });
    }
