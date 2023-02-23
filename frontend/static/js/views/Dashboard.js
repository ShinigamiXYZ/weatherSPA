// Importe la classe parente "AbstractView" depuis le fichier "AbstractView.js"
import AbstractView from "./AbstractView.js";

// Importe la classe parente "Map" depuis le fichier "Map.js afin d'afficher la map depuis l'acceuil."

import Map from "./Map.js";

// Exporte une classe par défaut (qui peut être importée par d'autres modules)
export default class extends AbstractView {
  constructor(params){
      // Appelle le constructeur de la classe parente "AbstractView" avec les paramètres reçus
      super(params)
       // Définit le titre de la page
    this.setTitle("ShinigamiWeather | Home");
    
    
  }




  async getHtml() {
   
  }

    
  }

