
require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');
var spotify = require('spotify')


var liriCmd = process.argv[2]
var term = process.argv.slice(3).join(" ")

if (liriCmd = "spotify-this-song") {
    spotifySearch(term)
}


function spotifySearch() {
  
var spotify = new Spotify(keys.spotify);

  var divider =
    "\n------------------------------------------------------------\n\n";

spotify.search({ type: 'track', query: term })
  .then(function(response) {
    console.log(divider)
    console.log(response.tracks.items[0].album.name)
    console.log(response.tracks.items[0].album.artists[0].name)
    console.log(response.tracks.items[0].album.external_urls.spotify);
    
  })
  .catch(function(err) {
    console.log(err);
  });
}


//   // findShow takes in the name of a tv show and searches the tvmaze API
//   this.findShow = function(show) {
//     var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;

//     axios.get(URL).then(function(response) {
//       // parse the response body (string) to a JSON object
//       var jsonData = response.data;


//       // showData ends up being the string containing the show data we will print to the console
//       var showData = [
//         "Name: " + jsonData.name,
//         "Genre(s): " + jsonData.genres.join(", "),
//         "Rating: " + jsonData.rating.average,
//         "Network: " + jsonData.network.name,
//         "Summary: " + jsonData.summary
//       ].join("\n\n");

//       // Append showData and the divider to log.txt, print showData to the console
//       fs.appendFile("log.txt", showData + divider, function(err) {
//         if (err) throw err;
//         console.log(showData);
//       });
//     });
//   };

//   this.findActor = function(actor) {
//     var URL = "http://api.tvmaze.com/search/people?q=" + actor;

//     axios.get(URL).then(function(response) {
//       // parse the response body (string) to a JSON object
//       var jsonData = response.data[0];

//       console.log(response.data)
//       var actorData = [
//         "Name: " + jsonData.person.name,
//         "Gender: " + jsonData.person.gender,
//         "Birthday: " + jsonData.person.birthday,
//         "Counter: " + jsonData.person.country.name,
//         "URL: " + jsonData.person.url
//       ].join("\n\n");

//       // Append showData and the divider to log.txt, print showData to the console
//       fs.appendFile("log.txt", actorData + divider, function(err) {
//         if (err) throw err;
//         console.log(actorData);
//       });
//     });
//   };
// };