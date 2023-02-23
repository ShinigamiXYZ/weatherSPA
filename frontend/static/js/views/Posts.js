// Importe la classe parente "AbstractView" depuis le fichier "AbstractView.js"
import AbstractView from "./AbstractView.js";

// Exporte une classe par défaut (qui peut être importée par d'autres modules)
export default class extends AbstractView {
    // Constructeur de la classe
    constructor(params){
        // Appelle le constructeur de la classe parente "AbstractView" avec les paramètres reçus
        super(params)
        // Définit le titre de la page
        this.setTitle("ShinigamiWeather | Worldwide");
    }

    // Fonction asynchrone qui renvoie le HTML pour la vue
    async getHtml() {
      // Crée un chemin stable en utilisant le protocole et l'hôte de la page
      const root = `${window.location.protocol}//${window.location.host}/`;
        // Récupère les données de l'API stockées en local (sous forme de chaîne de caractères)
        let data = localStorage.getItem("data");

        // Transforme la chaîne de caractères JSON en objet JavaScript
        data = JSON.parse(data);

        // Génère le HTML à retourner, en utilisant les données récupérées
        return  `<div class="w-full md:w-8/12 lg:w-1/3 shadow-lg rounded-lg p-6 bg-blue-400">
            <h2 class="text-xl font-bold mb-2">${data.city}, ${data.state}, ${data.country}</h2>
            <div class="flex text-white flex-wrap justify-between items-center">
              <div class="flex-1 mr-4 mb-4">
                <p class="font-bold text-white text-lg">${data.current.weather.tp}°C</p>
                <p>Pressure: ${data.current.weather.pr} hPa</p>
                <p>Humidity: ${data.current.weather.hu}%</p>
                <p>Wind Speed: ${data.current.weather.ws} m/s</p>
              </div>
              <div class="flex-1">
                <img src="${root}static/multimedia/${data.current.weather.ic}.png" alt="Weather Icon">
              </div>
            </div>
          </div>`
    }
}
