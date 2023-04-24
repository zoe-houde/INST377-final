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
    console.log('fired injectHTML')
    const target = document.querySelector('#restaurant_list')
    target.innerHTML = '';
    list.forEach((item, index) => {
    const str = `<li>${item.name}</li>` //backtick allows us to bring in varibles
    target.innerHTML += str
    })
  }
  
  /* A quick filter that will return something based on a matching input */
  function filterList(list, query) {
    return list.filter((item) => {
      const lowerCaseName = item.name.toLowerCase(); // PIZZA -->pizza
      const lowerCaseQuery = query.toLowerCase(); // PiZZa --> pizza
      return lowerCaseName.includes(lowerCaseQuery); //truth case
    })
  function cutRestaurantList(list) {
    console.log('fired cut list');
    const range = [...Array(15).keys()]; //new arrary
    return newArray = range.map((item)=> {
        const index = getRandomIntInclusive(0, list.length -1);
        return list[index]
    }) //map is like 'for each' returns new array  
  }
  }
function initCarto (carto) {
  const carto = L.map('map').setView([38.98, -76.93], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(carto);
  return carto;
}
function changeCarto (carto, dataObject) {
  carto.data.datasets.forEach((set) => {
    set.data = info;

  })
}


function shapeDataCarto(array) {
  return array.reduce((collection, item) => {
    if(!collection[item.category]) {
      collection[item.category] = [item]
    } else {
      collection[item.category].push(item);
    }
    return collection;
  }, {});
}

async function getData(){
  const url = "https://data.princegeorgescountymd.gov/Environment/LitterTRAK/9tsa-iner"
  const data = await fetch(url);
  const json = await data.json();
  
  const reply = json.filter((item) => Boolean(item.geocoded_column_1)).filter((item)=> Boolean(iteam.name));
  return reply;
}

function markerPlace (array, carto) {
  console.log ('array for markers', array);

  carto.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });

  array.forEach((resto) => {
    console.log('markerPlace', item);
    const {coordinates} = item.geocoded_column_1;

    L.marker([coordinates[1], coordinates[0]]).addTo(map);
  })

}

  async function mainEvent() { // the async keyword means we can make API requests
    const form = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const submit = document.querySelector('#form_button');
    const loadAnimation = document.querySelector('.lds-ellipsis');
    const restoName = document.querySelector('#resto');
    const changeTarget = document.querySelector('#myMap');
    submit.style.display = 'none';
    
   const myCarto =  initCarto(cartoTarget);

    /* APit data request */
    const cartoData = await getData();

    if (cartoData.length > 0) {
      submit.style.display = 'block';
      loadAnimation.classList.remove('lds-ellipsis');
      loadAnimation.classList.add('lds-ellipsis_hidden');

      let currentArray;
      form.addEventListener('submit', async (submitEvent)=> {
        submitEvent.preventDefault();
        currentArray = processResturants(cartoData);
      })
    }
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    mainForm.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    loadDataButton.addEventListener('click', async (submitEvent) => {
      submitEvent.preventDefault();
      console.log('loading data');
      loadAnimation.style.display = 'inline-block';

  
      // Basic GET request - this replaces the form Action
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
      // This changes the response from the GET into data we can use - an "object"
      const storedList= await results.json();
      localStorage.setItem('storedData', JSON.stringify(storedList));
      parsedData = storedList;

      if (storedList.length > 0 ) {
        generateListButton.classList.remove("hidden");
      }

      loadAnimation.style.display = 'none';
      //console.table(storedList);
        
    });
  
      
      console.table(currentList); 
      injectHTML (currentList);
  
    });
  
  
      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
  
      console.log(formProps);
      const newList = filterList(currentList, formProps.resto);
      console.log(newList);
      injectHTML (newList);
    }
  
    generateListButton.addEventListener('click', (event) => {
      console.log('generate new list');
      console.log('what is the type of recallList:', typeof recallList)

      currentList = cutRestaurantList(storedList);
      console.log(currentList)
      injectHTML(currentList);
      markerPlace(currentList, carto);
    })

    textField.addEventListener('input', (event) => {
        console.log('input', event.target.value);
        const newList = filterList(currentList, event.target.value);
        console.log(newList);
        injectHTML(newList);
        changeCarto(myCarto);
        markerPlace(newList, carto);

    })

    clearDataButton.addEventListener("click", (event)=> {
      console.log('clear browser data');
      localStorage.clear()
      console.group('localStorage Check', localStorage.getItem
      ("storedData"))
    })
    
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests */