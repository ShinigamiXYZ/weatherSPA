// Import des vues
import Dashboard from "./views/Dashboard.js"
import Posts from "./views/Posts.js"
import Location from "./views/Location.js"
import Liste from "./views/Liste.js"
import Country from "./views/Country.js"
import Town from "./views/Town.js"
import TownData from "./views/TownData.js"

// Sélection des éléments DOM
const app  = document.querySelector('#app');
const map = document.querySelector('#map');

// Fonction pour afficher la vue en fonction de la présence ou non de contenu dans la div #app
const viewDisplay = ()=>{
    let app = document.querySelector('#app');
    let map = document.querySelector('#map')

    if(app.innerHTML == 'undefined'){
        app.classList.add('hidden')
        map.classList.remove('hidden')
    }
    else if(app.innerHTML !== 'undefined'){
        app.classList.remove('hidden')
        map.classList.add('hidden')
    }
}

// Attente de chargement complet de la page avant d'appeler viewDisplay
window.addEventListener('load', () => {
    viewDisplay();
});

// Fonction pour transformer une route avec des paramètres en expression régulière
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

// Fonction pour récupérer les paramètres d'une route
const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) =>{
        return [key, values[i]]
    }))
}




// Fonction pour router les différentes vues
const router = async () => {
    const routes = [
        {path: "/", view:Dashboard},
        {path: "/post", view:Posts},
        {path: "/localisation", view:Location},
        {path: '/liste-pays', view: Liste},
        {path: '/liste-pays/:country/:town/:towndata', view: TownData},
        {path: '/liste-pays/:country/:town', view: Town},
        {path: '/liste-pays/:country', view: Country},
        
    ]

    // Création d'un tableau d'objets contenant la route et le résultat de la comparaison avec l'URL courante
    const potencialMatches = routes.map(route =>{
        return{
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    })

    // Récupération de la route correspondante
    let match = potencialMatches.find(potencialMatch => potencialMatch.result != null)

    if(!match){
         match = {
            route: routes[0],
            result: [location.pathname]
         }
    }

    // Création de la vue correspondante et affichage dans la div #app
    const view = new match.route.view(getParams(match))
    document.querySelector("#app").innerHTML = await view.getHtml()
}

// Fonction pour changer l'URL et appeler le router
const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

// Appel du router lors d'un changement d'URL
window.addEventListener("popstate", router);

// Appel de viewDisplay lors d'un clic sur n'importe quel élément de la page
document.addEventListener("click", viewDisplay);

// Appel du router lors du chargement complet de la page
document.addEventListener("DOMContentLoaded", ()=>{
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault()
            navigateTo(e.target.href)
            
        }
    })
    router()
   
    
})