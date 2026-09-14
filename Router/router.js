import Route from "./Route.js";
import { allRoutes, websitename } from "./allRoutes.js";

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html", []);

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
  let currentRoute = null;
  // Parcours de toutes les routes pour trouver la correspondance
  allRoutes.forEach((element) => {
    if (element.url == url) {
      currentRoute = element;
    }
  });
  // Si aucune correspondance n'est trouvée, on retourne la route 404
  if (currentRoute != null) {
    return currentRoute;
  } else {
    return route404;
  }
};

// Fonction pour charger le contenu de la page
let LoadContentPage = async () => {
  let path = window.location.pathname;
  if (path === "/index.html") {
    path = "/";
    window.history.replaceState({}, "", "/");
  }

  // Récupération de l'URL actuelle
  const actualRoute = getRouteByUrl(path);

  //Vérifier les droits d'accés a la page
  const allRoles = actualRoute.authorize;
  if (allRoles.length > 0) {
    if (allRoles.includes("disconnected")) {
      if (isConnected()) {
        window.location.replace("/");
      }
    } else {
      const roleUser = getRole();
      if (!allRoles.includes(roleUser)) {
        window.location.replace("/");
      }
    }
  }

  // Récupération du contenu HTML de la route
  const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
  // Ajout du contenu HTML à l'élément avec l'ID "main-page"
  document.getElementById("main-page").innerHTML = html;
  // On remonte tout en haut de la page après le changement de vue
  window.scrollTo(0, 0);

  // Ajout du contenu JavaScript
  if (actualRoute.pathJS != "") {
    var scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);
    document.querySelector("body").appendChild(scriptTag);
  }

  // Changement du titre de la page
  document.title = actualRoute.title + " - " + websitename;

  //Afficher et masquer les éléments en fonction du rôle
  showAndHideElementsForRoles();
};

// Fonction pour gérer les événements de routage (clic sur les liens)
const routeEvent = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  LoadContentPage();
};

// NOUVELLE FONCTION : Gestion spécifique du bouton de réservation
const handleReservationClick = (event) => {
  event.preventDefault();

  if (isConnected()) {
    window.history.pushState({}, "", "/reserver");
  } else {
    sessionStorage.setItem("urlPostConnexion", "/reserver");
    window.history.pushState({}, "", "/signin");
  }

  LoadContentPage();
};

// --- EXPOSITION AU HTML ET LANCEMENT ---

// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;

// On attache nos fonctions au window pour le HTML
window.route = routeEvent;
window.handleReservationClick = handleReservationClick;

// Chargement du contenu de la page au chargement initial (une seule fois !)
LoadContentPage();
