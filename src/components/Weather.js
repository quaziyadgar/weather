import { useEffect, useState, useCallback } from "react";
import Chart from "./Chart";
import _ from "lodash";

function Weather() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);
  const [inp, setInp] = useState("bangalore");
  const [show, setShow] = useState(false);

  const getSearchedLocation = useCallback(
    _.debounce((searchValue) => {
    //   console.log(searchValue);
      return setInp(searchValue);
    }, 500),
    []
  );

  const handleChange = (e) => {
    getSearchedLocation(e.target.value);
  };

  useEffect(() => {
    const city = inp;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=90a7a54a319f3cb24209a039be3ef186`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data.main);
        setCity(data);
        //console.log(data);
        return data;
      })
      .catch((err) => console.log(err));
  }, [inp]);

  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Enter Location"
          onChange={handleChange}
        />
      </div>
      {!data ? (
        <p>No data found</p>
      ) : (
        <>
          <div className="desc1">
            <p>City - {city.name}</p>
            <p>Weather Description - {city.weather[0].description}</p>
            <p>Current temperature - {data.temp}℃</p>
            <p>Today's high temperature - {data.temp_max}℃</p>
            <p>Today's low temperature - {data.temp_min}℃</p>
          </div>
          <div className="desc2">
            {show ? (
              <div>
                <p>Wind speed - {city.wind.speed} Km/h</p>
                <p>Humidity - {data.humidity} %</p>
                <p>Pressure - {data.pressure} mbar</p>
                <p>
                  Sunrise - {city.sys.sunrise} Sunset - {city.sys.sunset}
                </p>
              </div>
            ) : null}
            <button onClick={() => setShow(!show)}>
              {!show ? "More info" : "Less info"}
            </button>
          </div>
          <Chart city={inp} />
        </>
      )}
    </>
  );
}
export default Weather;
