const weather = document.querySelector(".js-weather");
const span = document.querySelector("span");

const API_KEYS ='b75144db356e4ae9baf6725e7b449803';
const COORDS = 'coords'; // string하나 만든거임
const WEATHERLC = 'weatherlocation';

function getWeather(lat,lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`
  ).then(function (response) {
    return response.json();
  }).then(function (json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  })//https:를 사용해서 백틱을 사용해줘야함,then은 완전히 처리가 끝난후 실행하는
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }; //key값과 변수값이 같을때는 하나만쓸수도 있음
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access GEO");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }
  else{
    const parseCoords = JSON.parse(loadedCoords);//객체로 변환
    getWeather(parseCoords.latitude,parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
