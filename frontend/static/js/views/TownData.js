import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("ShinigamiWeather | Worldwide");
    }

    // Fonction pour extraire le nom de la ville à partir de l'URL
    extractCityName(url) {
        const regex = /\/([A-Za-z]+)$/;
        const match = url.match(regex);
        if (match) {
          const state = match[1];
          return state;
        } else {
          return null; // ou gérer le cas où aucune correspondance n'est trouvée
        }
    }

    // Fonction pour nettoyer le localStorage lorsqu'on revient à l'accueil
    localHandling = ()=>{
        if(localStorage>0){
            localStorage.clear();
        }
    }

    async getHtml() {
        // Crée un chemin stable en utilisant le protocole et l'hôte de la page
        const root = `${window.location.protocol}//${window.location.host}/`;
      
        // Récupère les informations stockées dans le localStorage
        let country = localStorage.getItem("country");
        let state = localStorage.getItem("state");
        let city = this.extractCityName(window.location.href);
      
        // Appelle l'API pour récupérer les données météorologiques
        const apiUrl = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=9e5935d7-909a-4853-9657-815c51feda97`
        const response = await fetch(apiUrl);
        const data = await response.json();
      
        // Nettoie les données stockées dans le localStorage
        this.localHandling();
      
        // Construit la vue à renvoyer
        return `<div class="w-full md:w-8/12 lg:w-1/3 shadow-lg rounded-lg p-6 bg-blue-400">
          <h2 class="text-xl font-bold mb-2">${data.data.city}, ${data.data.state}, ${data.data.country}</h2>
          <div class="flex text-white flex-wrap justify-between items-center">
            <div class="flex-1 mr-4 mb-4">
              <p class="font-bold text-white text-lg">${data.data.current.weather.tp}°C</p>
              <p>Pressure: ${data.data.current.weather.pr} hPa</p>
              <p>Humidity: ${data.data.current.weather.hu}%</p>
              <p>Wind Speed: ${data.data.current.weather.ws} m/s</p>
            </div>
            <div class="flex-1">
              <img src="${root}static/multimedia/${data.data.current.weather.ic}.png" alt="Weather Icon">
            </div>
          </div>
        </div>`;
      }
      
    
} 
