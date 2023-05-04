//c5f217a7cd70ceb3fc5b61e23295f86a

const apiKey = "c5f217a7cd70ceb3fc5b61e23295f86a";
const apiCountryURL = "https://www.countryflagicons.com/FLAT/64/"
const apiUnsplash = "https://source.unsplash.com/1600x900/?"


const inputyCity = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city")
const temperatureElement = document.querySelector("#temperature span")
const descriptionElement = document.querySelector("#description")
const countryElement = document.querySelector("#country-flag")
const weatherIcon = document.querySelector("#weather-icon")
const umidityElement = document.querySelector("#umidity span")
const windyElement = document.querySelector("#wind span")
const weatherContainer = document.querySelector("#weather-data")

const MessageError = document.querySelector("#errorMessage")


//functions

const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;

};

const showWeatherData = async (city) => {

    hideInformation();
   const data = await getWeatherData(city);

   if (data.cod === "404") {

    showMessageError();
    
    return;

   }

   cityElement.innerText = data.name;
   temperatureElement.innerText = parseInt(data.main.temp);
   descriptionElement.innerText = data.weather[0].description;
   umidityElement.innerText = `${data.main.humidity}%`;
   windyElement.innerText = `${data.wind.speed}km/h`;
   weatherIcon.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
   countryElement.setAttribute("src", apiCountryURL + data.sys.country + ".png");

   
   //changing image background
   document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

   weatherContainer.classList.remove("hide");

};

// treating error message
const showMessageError = () => {

    MessageError.classList.remove("hide");

};

const hideInformation = () => {

    MessageError.classList.add("hide");
    weatherContainer.classList.add("hide");
    
};




//event

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = inputyCity.value;

    showWeatherData(city);

    
    
});

inputyCity.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
})