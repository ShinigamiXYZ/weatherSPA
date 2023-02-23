// Exporte une classe par défaut (qui peut être importée par d'autres modules)
export default class {
  constructor(params){
      // Stocke les paramètres d'initialisation de la classe dans l'objet "params"
      this.params = params
  }
  
  // Définit le titre de la page
  setTitle(title){
      document.title = title
  }
  
 
  // Fonction asynchrone pour récupérer des données à partir d'une URL donnée
  async getData(url) {
      const myEndPoint = url;
  
      // Effectue une demande HTTP GET à l'URL fournie et attend la réponse
      const response = await fetch(myEndPoint);  
      
      // Vérifie le type de contenu de la réponse
      const contentType = response.headers.get('content-type');
      
      // Si le type de contenu est JSON, analyse la réponse en tant qu'objet JSON et renvoie les données
      if (contentType.includes('application/json')) {
          const data = await response.json();  
          return data;
      }
      // Si le type de contenu est HTML, renvoie simplement la réponse en tant que texte
      else if (contentType.includes('text/html')) {
          const data = await response.text();
          return data;
      }
      // Si le type de contenu n'est ni JSON ni HTML, lance une erreur
      else {
          throw new Error('Unsupported content type');
      }
  }
  
  // Fonction asynchrone qui renvoie le HTML pour une vue donnée
  async getHtml() {
      return "" // Retourne une chaîne de caractères vide pour cette méthode
  }
}
