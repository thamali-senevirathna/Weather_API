function serchWeather(){
  let txt  =document.getElementById("searchTxt").value;

    fetchWeatherData(txt);
}

let apiKey="0a292b3696fb41b8af061802233009";

let tempText=document.getElementById("temperature");
let cityText=document.getElementById("city");

let icon = document.getElementById("imgAreaWeather");
let realFeel=document.getElementById("realTxt");
let wind=document.getElementById("windTxt");
let rain=document.getElementById("rainTxt");
let uv=document.getElementById("uvTxt");
fetchWeatherData("Anuradhapura");

function fetchWeatherData(location) {
    $.ajax({
      method : "GET",
      url: `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location} &aqi=no`,
      success : (data) => {
         console.log(data);

         tempText.innerHTML=data.current.temp_c+ "°C";
        cityText.innerHTML=data.location.name;
        icon.src=data.current.condition.icon;
         realFeel.innerHTML=data.current.feelslike_f+ " °F";
          wind.innerHTML=data.current.wind_kph+ " kph";
          rain.innerHTML=data.current.precip_mm+ " mm";
          uv.innerHTML=data.current.uv;
        //  countryP.text(data["location"]["country"]);
        //  idP.text (data["current"]["temp_c"] + "°C");
        //  latP.text (data["location"]["lat"]);
        //  lonP.text (data["location"]["lon"]);
        //  nameP.text (data["location"]["name"]);
        //  regionP.text(data["location"]["region"]);
        //  urlP.text(data["current"]["condition"]["text"]);
        //  humidity.text(data["current"]["humidity"]);
        //  tz_id.text(data["location"]["tz_id"]);
        //  wind_kph.text(data["current"]["wind_kph"] + "kph");
        //  img.src = data["current"]["condition"]["icon"];
      }
   });
  }