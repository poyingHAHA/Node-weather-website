const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=a997d7fc33f7845d73c792db32313280&query=" +latitude +"," +longitude;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const current = body.current;
      console.log(current)
      callback(undefined, current.weather_descriptions[0] +". It's " +current.temperature +" now. It feels like " +current.feelslike +" degrees out now.\nObservation time: "+current.observation_time+"\nhumidity: "+current.humidity);
    }
  });
};

module.exports = forecast;
