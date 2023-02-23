// Importe la classe parente "AbstractView" depuis le fichier "AbstractView.js"
import AbstractView from "./AbstractView.js";

// Exporte une classe par défaut (qui peut être importée par d'autres modules)
export default class extends AbstractView {
    constructor(params){
        // Appelle le constructeur de la classe parente "AbstractView" avec les paramètres reçus
        super(params)
        
        // Définit le titre de la page
        this.setTitle("ShinigamiWeather | Country")
    }

    // Fonction pour extraire le nom du pays à partir de l'URL
    extractCountryName(url) {
        // Utilise une expression régulière pour extraire le nom du pays
        const regex = /\/([A-Za-z]+)$/;
        const match = url.match(regex);
        if (match) {
          const country = match[1];
          return country;
        } else {
          return null; // ou gère le cas où aucune correspondance n'est trouvée
        }
    }

    // Fonction asynchrone qui renvoie le HTML pour la vue
    async getHtml() {
        // Extrait le nom du pays à partir de l'URL
        let country = this.extractCountryName(window.location.href);
        country = country.toLowerCase();

        // Récupère les clés d'API depuis l'API de configuration
        const fbppi = await this.getData(`http://localhost:8081/5ki2gxl4s0`);
        
        // Construit l'URL de l'API pour récupérer les États du pays donné
        const apiUrl = `http://api.airvisual.com/v2/states?country=${country}&key=${fbppi.apikey2}`;
          
        // Effectue une demande HTTP GET à l'URL de l'API et attend la réponse
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Stocke le nom du pays dans le stockage local de l'application
        localStorage.setItem("country", country);
        
        let innerHtml = `<div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center">`

        // Calcule le nombre de lignes nécessaires pour afficher la liste
        const rowCount = Math.ceil(data.data.length / 5)
        
        for (let i = 0; i < rowCount; i++) {
          innerHtml += "<tr>"
        
          // Insère les noms des États dans des cellules séparées de la ligne
          for (let j = 0; j < 5; j++) {
            const index = i * 5 + j
            if (index < data.data.length) {
              innerHtml += `<td class='inline-block px-6 py-2.5 bg-transparent text-blue-400 font-medium text-md leading-tight uppercase rounded hover:bg-blue-400 hover:text-green-900  transition duration-300 ease-in-out'><a href='/liste-pays/${country}/${data.data[index].state}' class="nav__link" data-link>${data.data[index].state}</a></td>`
            } 
          }
          
          innerHtml += "</tr>"
        }
        
        innerHtml += "</table>"
        
        // Retourne le HTML généré
        return innerHtml
}
}