var express = require("express");
var router = express.Router();
require("dotenv").config();
const axios = require("axios");

const DaprHttpPort = process.env.DAPR_HTTP_PORT || "3500";
const AlbumService = process.env.ALBUM_API_NAME || "album-api";
const Background = process.env.BACKGROUND_COLOR || "black";

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    // Invoke album-api via Dapr
    const url = `http://127.0.0.1:${DaprHttpPort}/v1.0/invoke/${AlbumService}/method/albums`;
    console.log("Invoking album-api via dapr: " + url);
    axios.headers = { "Content-Type": "application/json" };
    var response = await axios.get(url);
    // Parse the response
    data = response.data || [];
    console.log("Response from backend albums api: ", data);

    // Render the page
    res.render("index", {
      albums: data,
      background_color: Background,
    });
  } catch (err) {
    console.log("Error: ", err);
    next(err);
  }
});

module.exports = router;
