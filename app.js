const searchButton = document.querySelector(".searchBar__btn");
const searchInput = document.querySelector(".searchInput");

let map = L.map("map").setView([15, 16], 15);

const Stadia_OSMBright = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
).addTo(map);

const myIcon = L.icon({
  iconUrl: "/images/icon-location.svg",
});

newMarker = L.marker([15, 16], {
  icon: myIcon,
}).addTo(map);

const getUserIp = async () => {
  const response = await fetch("https://api.ipify.org/?format=json");
  const data = await response.json();
  let getObj = localStorage.getItem("Myip");
  let currentIp = JSON.parse(getObj);
  if (data.ip === currentIp.ip) {
    displayIp(currentIp);
  } else {
    getIpInfo(data.ip);
  }
};

getUserIp();

searchButton.addEventListener("click", () => {
  const ip = searchInput.value;
  getIpInfo(ip);
});

async function getIpInfo(ip) {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_e65d5UEGO5zjXOWmMUYgJ2xiOGzpS&ipAddress=${ip}`
  );
  const json = await response.json();
  displayIp(json);
}

function displayIp(ipObject) {
  const ip = document.getElementById("ip");
  const location = document.getElementById("location");
  const timezone = document.getElementById("timezone");
  const isp = document.getElementById("isp");

  ip.innerHTML = ipObject.ip;
  location.innerHTML = `${ipObject.location.country}, ${ipObject.location.city}`;
  timezone.innerHTML = `UTC  ${ipObject.location.timezone}`;
  isp.innerHTML = `${ipObject.isp}`;

  // save ip in localstorage
  const stringifyObject = JSON.stringify(ipObject);
  localStorage.setItem("Myip", stringifyObject);
  displayMap(ipObject);
}

function displayMap(res) {
  map.setView([res.location.lat, res.location.lng], 13);
  newMarker.setLatLng([res.location.lat, res.location.lng]);
}
