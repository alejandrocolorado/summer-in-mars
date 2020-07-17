//AUTOCOMPLETE FUNCTION

let citiesArr = [];

cities.forEach((elem) => {
  citiesArr.push(elem.name);
});

let resultCity;

function autocomplete(inp, arr) {
  var currentFocus;
  /*funcion que se activa cuando el usuario escribe*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*llama la funcion para cerrar cualquier lista existente*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*anexa el div al contenedor del cuadro para autocompletar*/
    this.parentNode.appendChild(a);

    for (i = 0; i < arr.length; i++) {
      /*Loop para revisar si las letras del input son iguales a las del arr*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*si encuentra un match crea un nuevo div*/
        b = document.createElement("DIV");
        /*hace que las letras que coincidan se vuelvan negrita*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*inserta un input field que mantiene el valor actual del item del arr*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*funcion de click para el div seleccionado por el usuario*/
        b.addEventListener("click", function (e) {
          /*inserta el valor del input de autocompletar:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*crea una variable global con el contenido del autocompletado*/
          resultCity = inp.value;

          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  const goButton = document.getElementById("go-go-go");

  goButton.addEventListener("click", function (e) {
    let coordObj = cities.find((elmt) => elmt.name === inp.value).coord;

    console.log(coordObj);

    let current = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
    callWeather(coordObj, current, resultCity);
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("search-input"), citiesArr);

//OPENWEATHER API CALL //NASA MARS WEATHER API CALL

async function callWeather(coordObj, current, resultCity) {
  const section = document.querySelector(".mars");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${coordObj.lat}&lon=${coordObj.lon}&units=metric&dt=${current}&appid=1fc51affa51b3e164ee01d4b51ee0939`
    );
    const data = await response.json();

    console.log(data);
    let avgTemp = data.current.temp;
    let tempArr = data.hourly.map((o) => o.temp);
    let maxTemp = Math.max(...tempArr);
    let minTemp = Math.min(...tempArr);
    console.log(avgTemp, minTemp, maxTemp);

    const responseM = await fetch(
      "https://api.nasa.gov/insight_weather/?api_key=WOG02mniWdRHxuIZefsUy4aoU4ddi0lQgwQnLkDv&feedtype=json&ver=1.0"
    );
    const dataM = await responseM.json();
    let currentSolar = dataM[Object.keys(dataM)[0]];
    let avgTempM = currentSolar.AT.av;
    let minTempM = currentSolar.AT.mn;
    let maxTempM = currentSolar.AT.mx;
    console.log(avgTempM, minTempM, maxTempM);

    const marsTempDiv = document.createElement("article");
    marsTempDiv.innerHTML = `
          <div class="modal fade" id="weatherModal" tabindex="-1" role="dialog" aria-labelledby="weatherModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" id="weatherModalLabel">SPAIN</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body temps-modal-body">
                <div>
                  <img src="http://openweathermap.org/img/wn/${
                    data.current.weather[0].icon
                  }@2x.png">
                  <h5>${resultCity}</h5>
                </div>
                <div class="avg-temp">
                  <span>Avg. temp</span> <p>${avgTemp.toFixed(1)}</p>
                </div>
                <div class="min-max-temp">
                  <p>Min. temp <br><strong>${minTemp.toFixed(1)} ºC</strong></p>
                  <p>Max. temp <br><strong>${maxTemp.toFixed(1)} ºC</strong></p>
                </div>
              </div>
              <div class="modal-header">
                <h3 class="modal-title" id="weatherModalLabel">MARS</h3>
              </div>
              <div class="modal-body temps-modal-body">
                <div>
                  <img src="http://openweathermap.org/img/wn/13d@2x.png">
                  <h5> Elysium Planitia </h5>
                </div>
                <div class="avg-temp">
                  <span>Avg. temp</span> <p>${avgTempM.toFixed(1)}</p>
                </div>
                <div class="min-max-temp">
                  <p>Min. temp <br><strong>${minTempM.toFixed(
                    1
                  )} ºC</strong></p>
                  <p>Max. temp <br><strong>${maxTempM.toFixed(
                    1
                  )} ºC</strong></p>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Try again!</button>
              </div>

            </div>
          </div>
        </div>
          `;

    section.appendChild(marsTempDiv);
  } catch (err) {
    console.log(err);
  }
}
