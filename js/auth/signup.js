// Implémenter le JS de ma page

const inputlastname = document.getElementById("lastnameInput");
const inputName = document.getElementById("firstnameInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById(
  "ValidatePasswordInput",
);
const btnValidation = document.getElementById("btn-validate-inscription");
const reqLength = document.getElementById('req-length');
const reqUpper = document.getElementById('req-upper');
const reqLower = document.getElementById('req-lower');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

inputlastname.addEventListener("keyup", validateForm);
inputName.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputPassword.addEventListener("input", () => validateChampsPassword(inputPassword));
inputValidatePassword.addEventListener("keyup", validateForm);


function validateForm() {
  const lastnameOk = validateRequired(inputlastname);
  const nameOk = validateRequired(inputName);
  const mailOk = validateMail(inputMail);
  const passwordOk = validatePassword(inputPassword);
  const passwordConfirmOk = validateConfirmPassword(inputPassword, inputValidatePassword);

  if (lastnameOk && nameOk && mailOk && passwordOk && passwordConfirmOk) {
    btnValidation.disabled = false;
  } else {
    btnValidation.disabled = true;
  }
}

function validateRequired(input) {
  if (input.value != "") {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");

    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");

    return false;
  }
}

function validateMail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailUser = input.value;
  if (mailUser.match(emailRegex)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");

    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");

    return false;
  }
}

function validateChampsPassword(input) {
  const mdp = input.value;

  const lengthOk = mdp.length >= 8;
  const upperOk = /[A-Z]/.test(mdp);
  const lowerOk = /[a-z]/.test(mdp);
  const numberOk = /\d/.test(mdp);
  const specialOk = /[\W_]/.test(mdp);

  if (lengthOk) {
    reqLength.classList.add('text-success');
  } else {
    reqLength.classList.remove('text-success');
  }

  if (upperOk) {
    reqUpper.classList.add('text-success');
  } else {
    reqUpper.classList.remove('text-success');
  }

  if (lowerOk) {
    reqLower.classList.add('text-success');
  } else {
    reqLower.classList.remove('text-success');
  }

  if (numberOk) {
    reqNumber.classList.add('text-success');
  } else {
    reqNumber.classList.remove('text-success');
  }

  if (specialOk) {
    reqSpecial.classList.add('text-success');
  } else {
    reqSpecial.classList.remove('text-success');
  }

  if (lengthOk && upperOk && lowerOk && numberOk && specialOk) {
    return true;
  } else {
    return false;
  }
}

function validatePassword(input) {
  if (validateChampsPassword(input)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");

    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");

    return false;
  }
}

function validateConfirmPassword(inputPassword, inputConfirmPassword){
    if(inputPassword.value === inputConfirmPassword.value && inputConfirmPassword.value !== ""){
        inputConfirmPassword.classList.add("is-valid");
        inputConfirmPassword.classList.remove("is-invalid");

        return true;
    }
    else{
        inputConfirmPassword.classList.add("is-invalid");
        inputConfirmPassword.classList.remove("is-valid");

        return false;
    }
}

 