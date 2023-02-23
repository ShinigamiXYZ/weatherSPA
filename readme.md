# weatherSPA

## Simple JS & express SPA fetching weather data from API


[ShinigamiWeather _ Home.webm](https://user-images.githubusercontent.com/98998507/220901668-eb3b4b1d-b551-4e5d-86be-f3e6cfcd354d.webm)

# API's

- leaflet (map) -> https://leafletjs.com/examples/quick-start/
- AirVisual API (Weather and air quality data ->  https://api-docs.iqair.com/

## Installation

- Create a new folder 
- Open prompt
```
npm init -y
npm install express
```
look at server.js for configuration

For local usage add this line to scripts in package.json
```
"start": "node server.js",

```

## Usage

Go on both api sites, to generate your own API keys and replace them in your local .env

In the browser, the navigation is simple.

Home : Shows Map.
List : starting point of all countries -> states -> towns 
Position : Gives the nearest town weather base on your Ip adress
