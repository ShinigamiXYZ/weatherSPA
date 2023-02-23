// Importe la classe parente "AbstractView" depuis le fichier "AbstractView.js"
import AbstractView from "./AbstractView.js";
// Exporte une classe par défaut (qui peut être importée par d'autres modules)
   export default class extends AbstractView {
    constructor(params){
         // Appelle le constructeur de la classe parente "AbstractView" avec les paramètres reçus
      super(params)
      // Définit le titre de la page
        this.setTitle("ShinigamiWeather | Localisation");
    }
   

  
        
        async getHtml() {
// Crée un chemin stable en utilisant le protocole et l'hôte de la page
const root = `${window.location.protocol}//${window.location.host}/`;
               // Récupère les clés d'API depuis l'API de configuration
        const fbppi = await this.getData(`http://localhost:8081/5ki2gxl4s0`);

        // Construit l'URL de l'API pour récupérer les pays
      
            const apiUrl = `http://api.airvisual.com/v2/nearest_city?key=${fbppi.apikey2}`;
             // Effectue une demande HTTP GET à l'URL de l'API et attend la réponse
            const response = await fetch(apiUrl);
            const data = await response.json();
             // Retourne le HTML généré
            return  ` <div class="w-full md:w-8/12 lg:w-1/3 shadow-lg rounded-lg p-6 bg-blue-400">
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
          </div>
      `
          }
          
}


