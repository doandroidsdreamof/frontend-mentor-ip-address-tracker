
import { geoKey, mapBoxToken } from "./apikey.js";

const inputSearch = document.querySelector(".container__header__form__input");
const ipShow = document.querySelector(".container2__ip");
const locationShow = document.querySelector(".container2__location");
const timeShow = document.querySelector(".container2__timezone");
const ispShow = document.querySelector(".container2__isp");
const buttonSearch = document.getElementById("sub");
const inputForm = document.getElementById('form');



/*const geoKey = '7e8d703067d7421c9650f0331796a3ac';
const mapBoxToken = 'pk.eyJ1IjoiZGlja2Vuc3giLCJhIjoiY2wzbHM5ZDA4MDJqNzNjcGpva240MzRxMSJ9.ecWQfsRnhJFlOayiC3srvw';
*/

const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${geoKey}`;
const urlSearch = 'https://ipgeolocation.abstractapi.com/v1/?api_key=';
const ipValid = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;


var latitudeEnlem = 0;
var longitudeBoylam = 0;
var ipAddress;
var time1;
var time2;
var city;
var country;
var isp;


var map = L.map('map').setView([0, -0], 13);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: `${mapBoxToken}`

}).addTo(map);



inputForm.addEventListener('submit', e => {
  e.preventDefault();
  if (ipValid.test(inputSearch.value)) {
    ipAddress = inputSearch.value;
    fetch(urlSearch + geoKey + '&ip_address=' + ipAddress)
      .then(response => response.json())
      .then(function (data) {
        ipShow.innerText = data.ip_address;
        locationShow.innerText = `${data.city},${data.country}`;
        timeShow.innerText = `${data.timezone.abbreviation},${data.timezone.current_time}`;
        ispShow.innerText = `${data.connection.autonomous_system_organization}`;
        var marker = L.marker([data.latitude, data.longitude]).addTo(map);
        map.panTo([data.latitude, data.longitude]);

      });

  }
  else {
    inputSearch.placeholder = "please enter valid ip address";
    inputSearch.value = "";
    ipShow.innerText = "";
    locationShow.innerText = "";
    timeShow.innerText = "";
    ispShow.innerText = "";

  }


})

window.onload = async () => {
  const response = await fetch(url)
  const data = await response.json()
  ipShow.innerText = data.ip_address;
  locationShow.innerText = `${data.city},${data.country}`;
  timeShow.innerText = `${data.timezone.abbreviation},${data.timezone.current_time}`;
  ispShow.innerText = `${data.connection.autonomous_system_organization}`;
  longitudeBoylam += data.longitude;
  latitudeEnlem += data.latitude;
  var marker = L.marker([data.latitude, data.longitude]).addTo(map);
  map.panTo([data.latitude, data.longitude]);
  city = data.city;
  country = data.country;
  time1 = data.timezone.abbreviation;
  time2 = data.timezone.current_time;
  ipAddress = data.ip_address;
  isp = data.connection.autonomous_system_organization;
  init(data);


}
function init({ data }) {
  map.panTo([this.latitudeEnlem, this.longitudeBoylam]);
  L.marker([this.latitudeEnlem, this.longitudeBoylam]).addTo(map);


}
init();


