function serchWeather() {
  let txt = document.getElementById("searchTxt").value;
  fetchWeatherData(txt);
  txt = document.getElementById("searchTxt").value = "";
}

let apiKey = "0a292b3696fb41b8af061802233009";

let tempText = document.getElementById("temperature");
let cityText = document.getElementById("city");
let locationDetails = document.getElementById("locationDetails");

let icon = document.getElementById("imgAreaWeather");
let humidity = document.getElementById("humidityTxt");
let wind = document.getElementById("windTxt");
let rain = document.getElementById("rainTxt");
let uv = document.getElementById("uvTxt");

let weatherStatus = document.getElementById("weatherStatus");
let lat = document.getElementById("lat");
let lon = document.getElementById("lon");

fetchWeatherData("Panadura");

function fetchWeatherData(location) {
  $.ajax({
    method: "GET",
    url: `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location} &aqi=no`,
    success: (data) => {
      console.log(data);

      tempText.innerHTML = data.current.temp_c + "°C";
      cityText.innerHTML = data.location.name;
      icon.src = data.current.condition.icon;
      humidity.innerHTML = data.current.humidity + " % ";
      wind.innerHTML = data.current.wind_kph + " kph";
      rain.innerHTML = data.current.precip_mm + " mm";
      uv.innerHTML = data.current.uv;
      weatherStatus.innerHTML =
        "Today is " + data.current.condition.text + " day .";
      lat.innerHTML = data.location.lat + " ϕ";
      lon.innerHTML = data.location.lon + " λ ";
    },
  });
}
// function localTime(){
//   let morningTime=document.getElementById("morningTime");
//   let nowTime=new Date();
//   let localTime = nowTime.toLocaleTimeString();
//   morningTime.textContent =`${localTime}`;
// }
// localTime();
// setInterval(localTime,1000);

//-----------------------------------------------------------------------------------

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  console.log(position.coords.latitude + "," + position.coords.longitude);
  fetchWeatherData(position.coords.latitude + "," + position.coords.longitude);
}

// ----------------------------------------------------------------------------------------------------
searchForecast();

function searchForecast() {
  let startDate = new Date(document.getElementById("startDate").value);
  let endDate = new Date(document.getElementById("endDate").value);
  let timeBetweenDiff = endDate - startDate;

  let daysBetweenDiff = timeBetweenDiff / (1000 * 3600 * 24);

  getForecastTime(
    document.getElementById("startDate").value,
    document.getElementById("endDate").value
  );
}

//---------------------------------------------------------------------------------------

function getForecastTime(startDate, endDate) {
  console.log(startDate, endDate);

  let iconIds = ["icon1", "icon2", "icon3", "icon4", "icon5", "icon6", "icon7"];
  let daysStatus = [
    "dayStatus1",
    "dayStatus2",
    "dayStatus3",
    "dayStatus4",
    "dayStatus5",
    "dayStatus6",
    "dayStatus7",
  ];
  let allDate = ["date1", "date2", "date3", "date4", "date5", "date6", "date7"];

  $.ajax({
    method: "GET",
    url: `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=Panadura&dt=${startDate}&end_dt=${endDate}`,
    success: (res) => {
      for (let i = 0; i < 8; i++) {
        const forecastDay = res["forecast"]["forecastday"][i]["day"];

        let icons = document.getElementById(iconIds[i]);
        let stateOfDate = document.getElementById(daysStatus[i]);
        let dates = document.getElementById(allDate[i]);

        icons.src = forecastDay["condition"]["icon"];
        stateOfDate.innerHTML = forecastDay["condition"]["text"];
        dates.innerHTML = res["forecast"]["forecastday"][i]["date"];
      }
    },
  });
}
// -------------------------------------------------
let btnMap = document.querySelector("#btnMap");
let map = document.querySelector(".dashMap");

btnMap.onclick = function () {
  map.classList.toggle("active");
};
