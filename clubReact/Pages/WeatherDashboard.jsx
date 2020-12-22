import React, { useState, useEffect } from "react";
import { urlServer, urlLocal } from "../clientURL";

const WeatherDashboard = () => {
  const [data, loading, error] = useFetch(urlLocal, "dailyWeather");

  return (
    <>
      <h1>Weather Dashboard</h1>
      {loading ? <h3>Loading...</h3> : <h2>{data.main.temp}</h2>}
    </>
  );
};

export default WeatherDashboard;

function useFetch(url, route) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let myRes = fetch(url + route);
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
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [url]);

  return [data, loading, error];
}
