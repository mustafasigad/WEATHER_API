// Query API to get city weather data
async function getCityWeather(city) {
  const apiKey = '<7d5f6b4f39d09ccff39f8b90fa16145e>';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7d5f6b4f39d09ccff39f8b90fa16145e`;
  const response = await fetch(url);
  const data = await response.json();
  return data

}
//const url=`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
// Display current weather data for given city
function displayCurrentWeather(data) {
  const city = data.city.name;
  const weather = data.list[0].weather[0];
  const icon = weather.icon;
  //const temp = weather.temp;
  const temp1 = data.list[0].main
  //data.list[0].wind.speed
  const humidity = data.list[0].main.humidity;
  const wind = data.list[0].wind.speed;
  let currentWeatherElement = `
      <div >
        <h2>${city} (${new Date()})</h2>
        <img src="https://openweathermap.org/img/w/${icon}.png"/>
        <p>Temp: ${temp1.temp}</p>
        <p>Humidity: ${humidity}</p>
        <p>Wind: ${wind}</p>
      </div>
    `;
  document.getElementById('current-weather').innerHTML = currentWeatherElement;
}

document.getElementById('city-input').value = ''

function displayForecast(data) {
  let newnewarray = []
  let newarray = []
  let current = 'Fri'
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


  console.log(newarray)
  // console.log(data)
  // this is the code to display the 5 days on the screen  
  let forecastElement = '<div  >';
  newarray.forEach(day => {
    forecastElement += `
        <div class='card'>
          <h3>${new Date(day.dt_txt)}</h3> 
          <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png"/>
          <p>Temp: ${day.main.temp - 273}</p>
          <p>Wind: ${day.wind.speed}</p>
          <p>Humidity: ${day.main.humidity}</p>
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


