const VALID_USER = "FCBREO";
const VALID_PASS = "cooperatie2026";

document.addEventListener("DOMContentLoaded", () => {
  const loginWrapper = document.getElementById("login-wrapper");
  const appWrapper = document.getElementById("app-wrapper");
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("login-error");

  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  // Controleer of er al een geldige login in deze browser is
  const isLoggedIn = sessionStorage.getItem("fcbreo-logged-in") === "true";
  if (isLoggedIn) {
    showApp();
  }

  // LOGIN AFHANDELEN
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = usernameInput.value.trim();
    const pass = passwordInput.value;

    if (user === VALID_USER && pass === VALID_PASS) {
      sessionStorage.setItem("fcbreo-logged-in", "true");
      loginError.textContent = "";
      showApp();
    } else {
      loginError.textContent = "Onjuiste gebruikersnaam of wachtwoord.";
    }
  });

  function showApp() {
    loginWrapper.style.display = "none";
    appWrapper.classList.add("show");
    appWrapper.setAttribute("aria-hidden", "false");
  }

  // NAVIGATIE TUSSEN PAGINA'S
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");

      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      sections.forEach((section) => {
        if (section.id === `section-${target}`) {
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
    });
  });
});
