
require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');
var spotify = require('spotify')


var liriCmd = process.argv[2]
var term = process.argv.slice(3).join(" ")

if (liriCmd === "spotify-this-song") {
    var songName = term
    spotifySearch(songName)
}
else if (liriCmd === "movie-this") {
    var movieName = term
    getMovie(movieName)
}
else if (liriCmd === "concert-this") {
    var artistName = term
    getConcert(artistName)
}
else if (liriCmd === "do-what-it-says") {
    logParser();
}
else {
    console.log("HEY! That's not a command!")
}


function spotifySearch() {
  
var spotify = new Spotify(keys.spotify);

if (!songName) {
    songName = "Ace of Base";
}
  var divider =
    "\n------------------------------------------------------------\n\n";

spotify.search({ type: 'track', query: songName })
  .then(function(response) {
    console.log(divider)
    console.log(response.tracks.items[0].album.name)
    console.log(response.tracks.items[0].album.artists[0].name)
    console.log(response.tracks.items[0].album.external_urls.spotify);
    
  })
  .catch(function(err) {
    console.log("Something went wrong" + err);
  });
}

function getMovie() {

    if (!movieName) {
        movieName = "Mr Nobody";
    }

    var URL = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=12ce2cb2"

    axios.get(URL).then(function(response) {
        
        var jsonData = response.data;

        var showData = [
        "Name: " + jsonData.Title,
        "Year: " + jsonData.Year,
        "Rating: " + jsonData.Rated,
        "Network: " + jsonData.imdbRating,
        "Summary: " + jsonData.Country,
        "Language: " + jsonData.Language, 
        'Plot: ' + jsonData.Plot +
        'Actors: ' + jsonData.Actors +
        'Rotten Rating: ' + jsonData.Ratings[1].Value 

    ].join("\n\n");

    console.log(showData)
    })
}

function getConcert () {

    var URL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"
    
    axios.get(URL).then(function(response) {
    
        var divider =
        "\n------------------------------------------------------------\n\n";

        var jsonData = response.data;

        var showData = [
        "Name: " + jsonData[0].venue.name,
        "Country: " + jsonData[0].venue.country,
        "City: " + jsonData[0].venue.city,
        "Date " + jsonData[0].datetime
        ].join("\n\n");
        console.log(divider,showData)
    })
}

function logParser () {

    fs.readFile("./random.txt", "utf8", function(error, data) {
        
        if (error) {
            return console.log(error);
          }
        
        
          var dataArr = data.split(",");
        
          songName = dataArr.slice(0).join(" ")
          spotifySearch(songName)

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