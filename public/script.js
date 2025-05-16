// server_url = 'http://localhost:400/'
server_url = 'https://demetra.loophole.site/'

let [gps_lat, gps_lon, tempTimestamp] = [0, 0, 0]
let menuStatus = "closed";
queryToRetrieveAllSensorsData = `{ allSensorData { temperature humidity gas gps_lat gps_lon created_at } }`
queryToRetrieveAllRecognitions = `{ allRecognitions { id object_name object_quantity gps_lat gps_lon sensor_created_at created_at } }`
queryToRetrieveAllCoordinates = `{ allRecognitions { id gps_lat gps_lon sensor_created_at created_at } }`

temperatureText = document.querySelector('.card.temperature h3 span')
humidityText = document.querySelector('.card.humidity h3 span')
gasText = document.querySelector('.card.gas h3 span')
objects_list = document.querySelector('.card.objects ul')
coordinates = document.querySelector('.card.coordinates')


const map = L.map('map').setView([gps_lat, gps_lon], 15);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://openstreetmap.org">OSM</a> | Tiles: <a href="https://carto.com/">Carto</a>',
}).addTo(map);

const demetraPinCurrentLocation = L.icon({ iconUrl: 'assets/drone-light.svg', iconSize: [40, 40], iconAnchor: [20, 40] });
const demetraPin = L.icon({ iconUrl: 'assets/demetra-pin.svg', iconSize: [40, 40], iconAnchor: [20, 40] });
const marker = L.marker([gps_lat, gps_lon], { icon: demetraPinCurrentLocation }).addTo(map)



requestToServer = async(query) => {
  try{
    const response = await fetch(server_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    return await response.json();
  }
  catch(error){ console.error("Error:", error); }
}

showPlace = async(lat, lon) => {
  try {

  }
  catch(err){ console.error('Errore:', err); }
}

getPlaceName = async (lat, lon) => {
  try {
    const data = await (await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`)).json();
    const placeName = data?.address?.city || data?.address?.town || data?.address?.village || "Nome non trovato";
    coordinates.querySelector('h3').innerHTML = `<strong>${placeName}</strong>: Lat: ${lat}; Lon: ${lon}`;
  } catch (err) {
    console.error('Errore:', err);
    coordinates.querySelector('h3').innerHTML = `<strong>Errore nel geocoding</strong>`;
  }
};



retrieveData = async() => {
  requestToServer(queryToRetrieveAllSensorsData)
    .then(data => {
      if(data && data.data && data.data.allSensorData && data.data.allSensorData.length > 0){
        data.data.allSensorData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        lastItem = data.data.allSensorData[0];
        temperatureText.textContent = `${lastItem.temperature.toFixed(2)}°C`;
        humidityText.textContent = `${lastItem.humidity.toFixed(2)}%`;
        gasText.textContent = `${lastItem.gas.toFixed(2)}%`;
        tempTimestamp = new Date(Number(lastItem.created_at)).toISOString();

        if(gps_lat != lastItem.gps_lat && gps_lon != lastItem.gps_lon){
          gps_lat = lastItem.gps_lat;
          gps_lon = lastItem.gps_lon;
          marker.setLatLng([gps_lat, gps_lon]);
          map.setView([gps_lat, gps_lon], 15);
          getPlaceName(gps_lat, gps_lon);
        }

        queryToRetrieveAllObjects = `{ recognition(gps_lat: ${gps_lat}, gps_lon: ${gps_lon}, sensor_created_at: "${tempTimestamp}") { id object_name object_quantity gps_lat gps_lon sensor_created_at created_at } }`;
        return requestToServer(queryToRetrieveAllObjects);
      }
      else console.error("An error occurred:", data);
    })
    .then(data => {
      if(!data) return;
      while(objects_list.firstChild){ objects_list.removeChild(objects_list.firstChild); }
      if(data && data.data && data.data.recognition && data.data.recognition.length > 0){
        document.querySelector('.card.objects span').textContent = "";

        data.data.recognition.forEach((object) => {
          const li = document.createElement('li');
          li.textContent = `${object.object_name} (${object.object_quantity})`;
          objects_list.appendChild(li);
        });
      }
      else console.error("An error occurred:", data);
    })
    .catch(error => { console.error("Error in the request:", error) });

  requestToServer(queryToRetrieveAllCoordinates)
    .then(data => {
      if(data && data.data && data.data.allRecognitions && data.data.allRecognitions.length > 0){
        data.data.allRecognitions.forEach((place) => {
          if(place.gps_lat < gps_lat - 0.0001 || place.gps_lat > gps_lat + 0.0001 || place.gps_lon < gps_lon - 0.0001 || place.gps_lon > gps_lon + 0.0001){
            const marker = L.marker([place.gps_lat, place.gps_lon], { icon: demetraPin }).addTo(map);
            const popupContent = `
              <b>Coordinates:</b><br>
              Lat: ${place.gps_lat}<br>
              Lon: ${place.gps_lon}
            `;
            marker.bindPopup(popupContent, { offset: L.point(0, -25) });
            marker.on('click', () => {
              marker.openPopup();
              showPlace(place.gps_lat, place.gps_lon);
            });
          }
        });
      }
      else console.error("An error occurred:", data);
    })

}


retrieveData()
setInterval(() => { retrieveData() }, 15000)




// MENU
function toggleMenu() {
  menuStatus = (menuStatus === "closed") ? "open" : "closed";
  updateMenu();
}

function updateMenu() {
  const menu = document.getElementById("menu");
  const main = document.querySelector("main");

  menu.classList.remove("open", "closed");
  main.classList.remove("open", "closed");

  menu.classList.add(menuStatus);
  main.classList.add(menuStatus);

  if(menuStatus === "open") document.body.classList.add("overflow-hidden");
  else document.body.classList.remove("overflow-hidden");
}