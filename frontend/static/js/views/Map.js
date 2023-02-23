export default class Map {
    // Constructeur qui prend les coordonnées latitude, longitude et le niveau de zoom en entrée
    // et génère une carte avec un marqueur à l'emplacement spécifié.
    constructor(lat, lng, zoom) {
      // Définit la carte en utilisant les coordonnées de latitude et de longitude et le niveau de zoom fournis.
      this.map = L.map("map").setView([lat, lng], zoom);
      // Ajoute une couche de tuiles à la carte en utilisant OpenStreetMap.
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 13,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);

      // Définit une pop-up pour la carte.
      this.popup = L.popup();
    }

    // Méthode appelée lorsque l'utilisateur clique sur la carte.
    onMapClick(e) {
      // Utilise les valeurs de latitude et de longitude dans l'appel API ici.
      const lat = e.latlng.lat; 
      const lng = e.latlng.lng;
      const apiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lng}&key=74c54c55-7ff0-4dbf-921b-6939da488ab5`;

    
    

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          //Store les data dans lemplacement local -> afin d'y acceder dans une vue.
          localStorage.setItem("data", JSON.stringify(data.data));

          let content = `<strong><h3>Pays : ${data.data.country}</h3> <h4>Ville : ${data.data.city}</h4> <h6>État : ${data.data.state}</h6> <span></strong>`;

          // POP UP content update en lien avec les date de LAPI
          this.popup
            .setLatLng(e.latlng)
            .setContent(
              ` ${content}` +
                `<strong>positionnement exacte </strong>:  ${e.latlng.toString()}.` +
                `<a href="/post"   class="nav__link"
                data-link>en savoir plus..</a>`
            )
            .openOn(this.map);
        })
        .catch((error) => {
          // afficher les erreurs dans la console le cas se presente
          console.error(error);
        });

      // Met à jour le contenu de la pop-up avec les coordonnées du point cliqué.
      /*   this.popup
        .setLatLng(e.latlng)
        .setContent("Vous avez cliqué sur la carte à " + e.latlng.toString())
        .openOn(this.map);
       */
    }

    // Méthode qui initialise la carte en attachant l'événement de clic à la carte.
    initialize() {
      this.map.on("click", this.onMapClick.bind(this));
    }
  }

  // Écouter l'événement de chargement de la fenêtre.
  window.addEventListener("load", () => {
    // Créer une nouvelle instance de la classe Map avec les entrées souhaitées.
    const map = new Map(45.508, -73.561, 10);
    // Appeler la méthode initialize pour attacher l'événement de clic à la carte.
    map.initialize();
  });