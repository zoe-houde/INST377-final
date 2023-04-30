/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/
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
  const url =
    "https://data.princegeorgescountymd.gov/Environment/LitterTRAK/9tsa-iner";
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
const mapNewish = initCarto();
  
const form = document.querySelector(".main_form"); // This class name needs to be set on your form before you can listen for an event on it
const submit = document.querySelector("#form_button");
const loadAnimation = document.querySelector(".lds-ellipsis");
const restoName = document.querySelector("#resto");
const cartoTarget = document.querySelector("#map");
submit.style.display = "none";

const myCarto = initCarto(cartoTarget);

//   // /* APit data request */
const cartoData = await getData();

if (cartoData.length > 0) {
submit.style.display = "block";
loadAnimation.classList.remove("lds-ellipsis");
loadAnimation.classList.add("lds-ellipsis_hidden");
loadAnimation.style.display = "none";
generateMapButton.classList.add("hidden");

mapNewish();

let currentArray;
form.addEventListener("submit", async (submitEvent) => {  
  submitEvent.preventDefault();
  currentArray = processResturants(cartoData);
});
}

mainForm.addEventListener("click", async (submitEvent) => {

loadMapButton.addEventListener("click", async (submitEvent) => {
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

const formData = new FormData(mainForm);
const formProps = Object.fromEntries(formData);

console.log(formProps);
const newList = filterList(currentList, formProps.resto);
console.log(newList);
injectHTML(newList);
}

generateMapButton.addEventListener("click", (event) => {
console.log("generate new list");
console.log("what is the type of recallList:", typeof recallList);

generateDropDown.addEventListener("click", (event) => {
  console.log("dropdown menu")
  console.log("getting zipcode",typeof zip)
})

currentList = cutRestaurantList(storedList);
console.log(currentList);
injectHTML(currentList);
markerPlace(currentList, newMap);
});

textField.addEventListener("input", (event) => {
console.log("input", event.target.value);
const newList = filterList(currentList, event.target.value);
console.log(newList);
injectHTML(newList);
changeCarto(myCarto);
markerPlace(newList, carto);
});

clearDataButton.addEventListener("click", (event) => {
console.log("clear browser data");
localStorage.clear();
console.group("localStorage Check", localStorage.getItem("storedData"));
});

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests */
