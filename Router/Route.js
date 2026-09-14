export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      this.authorize = authorize;
    }
}

const gererClicReservation = (event) => {
  event.preventDefault();

  // 2. On vérifie si l'utilisateur est connecté grâce à la fonction que tu as déjà !
  const userConnected = isConnected();

  if (userConnected) {
    window.location.replace("/Reserver")
    // À TOI DE JOUER : Comment ferais-tu pour forcer ton routeur 
    // à charger la page "/reservation" ici ?
  } else {
    window.location.replace("/signup")
    // À TOI DE JOUER : Comment ferais-tu pour forcer ton routeur 
    // à charger la page "/connexion" ici ?
  }
};