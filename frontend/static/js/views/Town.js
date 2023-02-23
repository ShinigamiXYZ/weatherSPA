import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params);
        this.setTitle("ShinigamiWeather | Town");
    }

    // Méthode qui permet d'extraire le nom de l'état dans l'URL
    extractStateName(url) {
        const regex = /\/([A-Za-z]+)$/;
        const match = url.match(regex);
        if (match) {
          const state = match[1];
          return state;
        } else {
          return null; // ou gérer le cas où aucune correspondance n'a été trouvée
        }
    }

    // Méthode asynchrone qui renvoie la liste des villes d'un état d'un pays donné
    async getHtml() {
        // Récupérer le nom du pays à partir du localStorage
        let country = localStorage.getItem("country");

        // Extraire le nom de l'état à partir de l'URL
        let state = this.extractStateName(window.location.href);

        // Récupérer la clé d'API à partir du serveur backend
        const fbppi = await this.getData(`http://localhost:8081/5ki2gxl4s0`);

        // Stocker le nom de l'état dans le localStorage
        localStorage.setItem("state", state);

        // Construire l'URL de l'API pour récupérer la liste des villes de l'état et du pays donnés
        const apiUrl = `http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${fbppi.apikey3}`;

        // Effectuer une requête HTTP GET à l'URL de l'API
        const response = await fetch(apiUrl);

        // Extraire les données de la réponse en tant qu'objet JSON
        const data = await response.json();

        // Construire la table HTML pour afficher la liste des villes
        let innerHtml = `<div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">`;

        // Calculer le nombre de lignes nécessaires pour afficher la liste
        const rowCount = Math.ceil(data.data.length / 5);

        for (let i = 0; i < rowCount; i++) {
            innerHtml += "<tr>";
        
            // Insérer les noms de villes dans des cellules séparées de la ligne
            for (let j = 0; j < 5; j++) {
                const index = i * 5 + j;
                if (index < data.data.length) {
                    innerHtml += `<td class='inline-block px-6 py-2.5 bg-transparent text-blue-400 font-medium text-md leading-tight uppercase rounded hover:bg-blue-400 hover:text-green-900  transition duration-300 ease-in-out'><a href='/liste-pays/${country}/${state}/${data.data[index].city}' class="nav__link" data-link>${data.data[index].city}</a></td>`;
                } 
            }

            innerHtml += "</tr>";
        }
        
        innerHtml += "</table>";
        
        return innerHtml; 
    }
};
