const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
  //Ici il faudras appeler l'API pour vérifier les credentials en BDD

  if (mailInput.value === "test@gmail.com" && passwordInput.value === "123") {
    //Il faudras récupérer le vrai token
    const token = "alzdaklzcazkndazbhazdazdfazcazcaz";
    setToken(token);
    //Placer ce token en cookie

    setCookie(roleCookieName, "admin", 7)
    const urlRedirection = sessionStorage.getItem("urlPostConnexion");
    if (urlRedirection) {
      sessionStorage.removeItem("urlPostConnexion");
      window.location.replace(urlRedirection);
    }else {
      window.location.replace("/");
    }
    
  } else {
    mailInput.classList.add("is-invalid");
    passwordInput.classList.add("is-invalid");
  }
}
