// Query API to get city weather data
async function getCityWeather(city) {
  const apiKey = '<7d5f6b4f39d09ccff39f8b90fa16145e>';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7d5f6b4f39d09ccff39f8b90fa16145e`;
  const response = await fetch(url);
  const data = await response.json();
  return data

}

// Display current weather data for given city
function displayCurrentWeather(data) {
  const city = data.city.name;
  const weather = data.list[0].weather[0];
  const icon = weather.icon;
  const temp1 = data.list[0].main
  const humidity = data.list[0].main.humidity;
  const wind = data.list[0].wind.speed;
  let currentWeatherElement = `
      <div >
        <h2>${city} (${new Date()})</h2>
        <img src="https://openweathermap.org/img/w/${icon}.png"/>
        <p>Temp: ${temp1.temp.toFixed() - 273}<span> ℃ </span> </p>
        <p>Humidity: ${humidity}<span> MPH </span></p>
        <p>Wind: ${wind}<span> % </span></p>
      </div>
    `;
  document.getElementById('current-weather').innerHTML = currentWeatherElement;
}

function displayForecast(data) {
  let newnewarray = []
  let newarray = []
  // get the current date , this will be sued to  get the 5 days forcast 
  let rightNow = dayjs().format("dddd, MMMM  YYYY, h:mm:ss a");
  let current = rightNow.slice(0, 3)
  console.log(current)
  let myarray = []
  console.log(data)
  for (i = 0; i < data.list.length; i++) {

    const dateTime = new Date(`${data.list[i].dt_txt}`);
    // Extract only the date in locale format 
    const date = dateTime.toDateString();
    const newdate = date.slice(0, 3)
    newnewarray.push(newdate)

    if (current != newnewarray[i]) {

      myarray = data.list[i]

      newarray.push(myarray)
    }
    let currents = new Date(`${data.list[i].dt_txt}`)
    const dates = currents.toDateString();
    current = dates.slice(0, 3)
  }
  let forecastElement = '<div>';
  newarray.forEach(day => {

    forecastElement += `    
        <div class='card'>
          <h3>${new Date(day.dt_txt)}</h3> 
          <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png"/>
          <p>Temp: ${day.main.temp.toFixed() - 273} <span> ℃ </span> </p>
          <p>Wind: ${day.wind.speed} <span> MPH </span> </p>
          <p>Humidity: ${day.main.humidity} <span> %</span> </p></p>
        </div>
      `;
  });
  forecastElement += '</div>';
  document.getElementById('weather-forecast').innerHTML = forecastElement;

}
// Get weather data and display when form submitted
document.getElementById('search-form').addEventListener('click', async (event) => {
  event.preventDefault();

  const city = document.getElementById('city-input').value;
  const data = await getCityWeather(city);
  localStorage.setItem('mycity', city)
  console.log(city)
  createMyButton()
  displayCurrentWeather(data);
  displayForecast(data);

});

let buttonContainer = document.getElementById('makingButton');
let container = document.getElementsByClassName('formandSearch');

function createMyButton() {
  let button = document.createElement('button');
  button.setAttribute('class', 'coloring')
  button.textContent = localStorage.getItem('mycity');
  buttonContainer.appendChild(button);
  // this is to add an event listen to the created button
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    const city = button.textContent;
    const data = await getCityWeather(city);
    displayCurrentWeather(data);
    displayForecast(data);

  });

}


