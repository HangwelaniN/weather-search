function showResults(city) {
  //let city = "Johannesburg";
  let apiKey = `5a672aa271oba8c4c6073t525f8b14c8`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");

  showResults(city.value);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function formatDT(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  day = days[date.getDay()];
  return day;
}

function showForecast(response) {
  console.log(response.data);
  let forcast = document.querySelector("#forecast");

  let forcastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `
    <div class="col-2">
    <div id="forecast-day">${formatDT(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="42"
          id="icons"
        />
      <div>
       <span class="max">${Math.round(
         forecastDay.temperature.maximum
       )}°</span> <span class="min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
      </div>
   
      
    
  `;
    }
  });

  forcastHTML = forcastHTML + ` </div>`;
  forcast.innerHTML = forcastHTML;
}
function getForcast(coordinates) {
  console.log(coordinates.longitude);
  let apiKey = `5a672aa271oba8c4c6073t525f8b14c8`;
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let city = document.querySelector("#city");
  let temp = document.querySelector("#temperature");
  let humi = document.querySelector("#Humidity");
  let wind = document.querySelector("#wind");
  let des = document.querySelector("#description");
  let dateTime = document.querySelector("#dayTime");
  let icon = document.querySelector("#icons");

  city.innerHTML = response.data.city;
  temp.innerHTML = Math.round(response.data.temperature.current);
  humi.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  des.innerHTML = response.data.condition.description;
  dateTime.innerHTML = formatDate(response.data.time * 1000);
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForcast(response.data.coordinates);
}

let city = "Johannesburg";
let apiKey = `5a672aa271oba8c4c6073t525f8b14c8`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

showResults("Munsieville");
