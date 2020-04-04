const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationInfo = document.querySelector("#loc");
const forecastInfo = document.querySelector("#forecast");
const errMsg = document.querySelector("#err");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  errMsg.textContent = "Loading...";
  locationInfo.textContent = "";
  forecastInfo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        errMsg.textContent = data.error;
      } else {
        errMsg.textContent = "";
        locationInfo.textContent = data.location;
        forecastInfo.textContent = data.forecastData;
        // console.log(data.location);
        // console.log(data.forecastData);
      }
    });
  });
});
