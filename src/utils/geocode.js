const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXJ0bWFyaSIsImEiOiJjazg0dmJ4bjUwMGVyM2VtcXQ5Z3R0MDdiIn0.re6Tiab2JSgC-nqiQdYZCw`;
  request(url, (error, response) => {
    const json = JSON.parse(response.body);
    const { features } = json;
    if (error) {
      callback(error, undefined);
    } else if (features.length === 0) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longtitude: features[0].center[0],
        location: features[0].place_name
      });
    }
  });
};
module.exports = geocode;
