import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const appId = "1294993ec199d33eaf85e37252ab80b4";
const day =
  new Date().getDate() +
  "." +
  (1 + new Date().getMonth()) +
  "." +
  new Date().getFullYear();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      API_URL + "New york" + "&units=metric&appid=" + appId
    );
    const result = response.data;
    const response1 = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?" +
        "lat=" +
        result.city.coord.lat +
        "&lon=" +
        result.city.coord.lon +
        "&units=metric&appid=" +
        appId
    );
    const result1 = response1.data;

    console.log(result1);

    res.render("index.ejs", {
      week,
      result,
      result1,
      day
    });
  } catch (error) {
    res.render("index.ejs", { error: "City Not Found" });
  }
});

app.post("/submit", async (req, res) => {
  const city = req.body.city;

  try {
    const response = await axios.get(
      API_URL + city + "&units=metric&appid=" + appId
    );
    const result = response.data;

    const response1 = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?" +
        "lat=" +
        result.city.coord.lat +
        "&lon=" +
        result.city.coord.lon +
        "&units=metric&appid=" +
        appId
    );
     const result1 = response1.data;

    res.render("index.ejs", {
      week,
      result,
      result1,
      day
    });
  } catch (error) {
    res.render("index.ejs", { error: "City Not Found" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let week = [];
let today = new Date().getDay();

switch (today) {
  case 0:
    week = ["Mon", "Tues", "Wednes", "Thurs", "Fri"];
    break;
  case 1:
    week = ["Tues", "Wednes", "Thurs", "Fri", "sat"];
    break;
  case 2:
    week = ["Wednes", "Thurs", "Fri", "Satur", "Sun"];
    break;
  case 3:
    week = ["Thurs", "Fri", "Satur", "Sun", "Mon"];
    break;
  case 4:
    week = ["Fri", "Satur", "Sun", "Mon", "Tues"];
    break;
  case 5:
    week = ["Satur", "Sun", "Mon", "Tues", "Wednes"];
    break;
  case 6:
    week = ["Sun", "Mon", "Tues", "Wednes", "Thurs"];
    break;
}
