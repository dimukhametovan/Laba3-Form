document.addEventListener("DOMContentLoaded", function () {
  let openButton = document.querySelector("#register");
  let overlay = document.querySelector("#overlay-modal"); //передаем id через #
  let closeButton = document.querySelector("#closeButton");
  let modal = document.querySelector(".modal");
  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  let error = document.querySelector("#error");
  let showPassword = document.querySelector("#showPassword");
  let registerForm = document.querySelector("#registerForm");

  function showError(errorMessage) {
    if (!error.firstChild) {
      const errorText = document.createElement("span");
      errorText.textContent = errorMessage;
      error.appendChild(errorText);
    }
  }

  function removeError() {
    if (error.firstChild) {
      error.removeChild(error.firstChild);
    }
  }

  function openModal() {
    modal.classList.add("active");
    overlay.classList.add("active");
  }

  function closeModal() {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    registerForm.reset();
  }

  openButton.addEventListener("click", function (event) {
    event.preventDefault(); //не дает случиться стандартному действию
    openModal();
  });

  closeButton.addEventListener("click", function (event) {
    event.preventDefault(); //не дает случиться стандартному действию
    closeModal();
  });

  overlay.addEventListener("click", function (event) {
    //серая подложка
    event.preventDefault(); //не дает случиться стандартному действию
    closeModal();
  });

  emailInput.addEventListener("blur", function (event) {
    event.preventDefault();
    const value = event.target.value;
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
      !value.length
    ) {
      removeError();
      emailInput.setCustomValidity("");
    } else {
      showError("Your Email is invalid");
      emailInput.setCustomValidity("Your Email is invalid");
    }
    emailInput.reportValidity();
  });

  passwordInput.addEventListener("blur", function (event) {
    event.preventDefault();
    const value = event.target.value;
    if (value.length >= 6) {
      removeError();
      passwordInput.setCustomValidity("");
    } else {
      showError("Your Password is too short");
      passwordInput.setCustomValidity("Your Password is too short");
    }
    passwordInput.reportValidity();
  });

  showPassword.addEventListener("pointerdown", function (event) {
    event.preventDefault();
    passwordInput.type = "text";
  });

  showPassword.addEventListener("pointerup", function (event) {
    event.preventDefault();
    passwordInput.type = "password";
  });

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(registerForm);
    for (let [key, value] of data) {
      console.log(`${key} - ${value}`);
    }
    closeModal();
  });
});
