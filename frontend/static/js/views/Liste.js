// Importe la classe parente "AbstractView" depuis le fichier "AbstractView.js"
import AbstractView from "./AbstractView.js";

// Exporte une classe par défaut (qui peut être importée par d'autres modules)
export default class extends AbstractView {
    constructor(params){
       // Appelle le constructeur de la classe parente "AbstractView" avec les paramètres reçus
      super(params)
      // Définit le titre de la page
        this.setTitle("ShinigamiWeather | Liste")
    }

    // Fonction asynchrone qui renvoie le HTML pour la vue
    async getHtml() {
        // Récupère les clés d'API depuis l'API de configuration
        const fbppi = await this.getData(`http://localhost:8081/5ki2gxl4s0`);

        // Construit l'URL de l'API pour récupérer les pays
        const apiUrl = `http://api.airvisual.com/v2/countries?key=${fbppi.apikey1}`;
          
        // Effectue une demande HTTP GET à l'URL de l'API et attend la réponse
        const response = await fetch(apiUrl);
        const data = await response.json();

        let innerHtml = `<div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center">`

        // Calcule le nombre de lignes nécessaires pour afficher la liste
        const rowCount = Math.ceil(data.data.length / 9)
        
        for (let i = 0; i < rowCount; i++) {
          innerHtml += "<tr>"
        
          // Insère les noms des pays dans des cellules séparées de la ligne
          for (let j = 0; j < 9; j++) {
            const index = i * 9 + j
            if (index < data.data.length) {
              innerHtml += `<td class='inline-block px-6 py-2.5 bg-transparent text-blue-400 font-medium text-md leading-tight uppercase rounded hover:bg-blue-400 hover:text-green-900  transition duration-300 ease-in-out'><a href='/liste-pays/${data.data[index].country}' class="nav__link" data-link>${data.data[index].country}</a></td>`
            } 
          }
          
          innerHtml += "</tr>"
        }
        
        innerHtml += "</table>"
        
        // Retourne le HTML généré
        return innerHtml
    }
} 