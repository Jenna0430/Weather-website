// function to display the date and time of the city searched.
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//function to render the html for the different days and thier forecast on the page 
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML +=
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}















//function to display the temperature and forecast of the city
function displayTemp(response) {
  let tempElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

   celsiusTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  // getForecast(response.data.coord);
}

//function that uses the api to search for the city
function search(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

//function to submit the search input
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-city");
  search(cityInput.value);
}

// function displayFahrenheit(event){
//   event.preventDefault();
//   let tempElement = document.querySelector("#temp");
//   //remove the active class from the celsius link
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");

//   let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
//   tempElement.innerHTML = Math.round(fahrenheitTemp);

// }

// function displayCelsius(event){
//   event.preventDefault();
//   let tempElement = document.querySelector("#temp");
//   //remove the active class from the fahrenheit link
//   fahrenheitLink.classList.remove("active");
//   celsiusLink.classList.add("active");
//   tempElement.innerHTML = Math.round(celsiusTemp);
// }

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink .addEventListener("click", displayFahrenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink .addEventListener("click", displayCelsius);

search("Nairobi");
