const request = require("postman-request");
//const geocode = require("./geocode");

const forecast = (latitude, longtitude, callback) => {
  const url = `https://api.darksky.net/forecast/9bd77b85ff0791129ad814bb56683f78/${latitude},${longtitude}`;
  request(url, (error, response) => {
    if (error) {
      callback(error, undefined);
    } else {
      const json = JSON.parse(response.body);
      const { daily } = json;
      callback(undefined, daily.summary);
    }
  });
};

module.exports = forecast;
