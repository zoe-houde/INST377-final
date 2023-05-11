function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function injectHTML(list) {
  console.log("fired injectHTML");
  const target = document.querySelector("#restaurant_list");
  target.innerHTML = "";
  list.forEach((item, index) => {
    const str = `<li>${item.name}</li>`; //backtick allows us to bring in varibles
    target.innerHTML += str;
  });
}

function cutAreaList(list) {
  console.log("fired cut list");
  const range = [...Array(15).keys()]; //new arrary
  return (newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index];
  })); //map is like 'for each' returns new array
}

function initCarto() {
  console.log("initCarto");
  const newMap = L.map("map").setView([38.98, -76.93], 13); //define 
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(newMap);
  return newMap;
}
function changeCarto(newMap, dataObject) {
  carto.data.datasets.forEach((set) => {
    set.data = info;
  });
}

function shapeDataCarto(array) {
  return array.reduce((collection, item) => {
    if (!collection[item.category]) {
      collection[item.category] = [item];
    } else {
      collection[item.category].push(item);
    }
    return collection;
  }, {});
}

async function getData() {
  const url = "https://data.princegeorgescountymd.gov/resource/9tsa-iner.json";
  const data = await fetch(url);
  const json = await data.json();

  const reply = json
    .filter((item) => Boolean(item.geocoded_column_1))
    .filter((item) => Boolean(iteam.name));
  return reply;
}

function markerPlace(array, carto) {
  console.log("array for markers", array);

  carto.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });

  array.forEach((resto) => {
    console.log("markerPlace", item);
    const { coordinates } = item.geocoded_column_1;

    L.marker([coordinates[1], coordinates[0]]).addTo(newMap);
  });
}

async function mainEvent() {
  //const mapNewish = initCarto();
  const newMap = L.map("map").setView([38.98, -76.93], 13); //define 
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(newMap);

  const form = document.querySelector(".main_form"); // This class name needs to be set on your form before you can listen for an event on it
  const submit = document.querySelector("#form_button");
  const loadAnimation = document.querySelector(".lds-ellipsis");
  const restoName = document.querySelector("#resto");
  const cartoTarget = document.querySelector("#map");
  loadAnimation.style.display = "block";

  //   //   // /* APit data request */
  const cartoData = await getData();


  function generateDropDown() {
    document.getElementById("myDropDown").classList.toggle("show");
  }

  window.onclick = function (event) {
    if (!event.target.matches(".droptn")) {
      var dropdowns =
        document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropDown = dropdowns[i];
        if (openDropDown.classList.contains('show')) {
          openDropDown.classList.remove('show');
        }
      }
    }
  }

  if (cartoData.length > 0) {
    submit.style.display = "block";
    loadAnimation.classList.remove("lds-ellipsis");
    loadAnimation.classList.add("lds-ellipsis_hidden");
    loadAnimation.style.display = "none";
    generateMapButton.classList.add("hidden");

    //mapNewish();


    let currentArray;
    form.addEventListener("submit", async (submitEvent) => {
      submitEvent.preventDefault();
      currentArray = processResturants(cartoData);
    });
  }
  const mainForm = newMap;
   mainForm.addEventListener("click", async (submitEvent) => {

    loadMap.addEventListener("click", async (submitEvent) => {
      submitEvent.preventDefault();
      console.log("loading data");
      loadAnimation.style.display = "inline-block";

      const results = await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json");

      const storedList = await results.json();
      localStorage.setItem("storedData", JSON.stringify(storedList));
      parsedData = storedList;

      loadAnimation.style.display = "none";
      console.table(storedList);
    });

    console.table(currentList);
    injectHTML(currentList);
  });

  const formProps = Object.fromEntries(formData);

  console.log(formProps);
  const newList = filterList(currentList, formProps.resto);
  console.log(newList);
  injectHTML(newList);
}

generateMapButton.addEventListener("click", (event) => {
  console.log("generate new list");
  console.log("what is the type of recallList:", typeof recallList);


  currentList = myCarto(storedList);
  console.log(currentList);
  injectHTML(currentList);
  markerPlace(currentList, initCarto);
});



formDataButton.addEventListener("click", (event) => {
  console.log("clear all data");
  const formControl = localStorage.clear();
  formControl.addEventListener("click", (event) => {
    console.group("local Storage Check", localStorage.getItem("storedData"));
  })
});


clearDataButton.addEventListener("click", (event) => {
  console.log("clear browser data");
  localStorage.clear();
  console.group("local Storage Check", localStorage.getItem("storedData"));
});

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests */
