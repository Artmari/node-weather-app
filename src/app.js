const express = require("express");
const path = require("path");
const chalk = require("chalk");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Main page"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Maria"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpMsg: "Help message"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      } else
        forecast(latitude, longtitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error
            });
          }
          return res.send({
            location,
            forecastData
          });
        });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    errMsg: "Help page is not found"
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    errMsg: "Page is not found"
  });
});

app.listen(3000, () => {
  console.log(chalk.blue("Server is up on port 3000"));
});
