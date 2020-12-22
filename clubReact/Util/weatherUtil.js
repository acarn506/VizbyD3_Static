import { urlServer, urlLocal } from "../clientURL";

// fetch daily weather data
export const getDailyWeatherData = () => {
  // A promise for the response
  let myRes = fetch(urlLocal + "dailyWeather");
  // A promise for the body
  let myBody = myRes.then(function(res) {
    // Work with response
    console.log(`${res.statusText} response for ${res.url}`);
    // returns a promise for the body
    return res.json();
  });

  myBody
    .then(function(body) {
      let data = body;
      console.log(data.main);
      return data.main;
    })
    .catch(error => {
      console.error("Error:", error);
    });
};
