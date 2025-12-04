const VALID_USER = "FCBREO";
const VALID_PASS = "cooperatie2026";

document.addEventListener("DOMContentLoaded", () => {
  const loginWrapper = document.getElementById("login-wrapper");
  const appWrapper = document.getElementById("app-wrapper");
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("login-error");
  const logoutBtn = document.getElementById("logout-btn");

  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  const togglePasswordBtn = document.getElementById("toggle-password");

  // CONTROLEER LOGIN STATUS
  const isLoggedIn = sessionStorage.getItem("fcbreo-logged-in") === "true";
  if (isLoggedIn) {
    showApp();
  } else {
    // AUTOMATISCH CURSOR IN GEBRUIKERSNAAM
    usernameInput.focus();
  }

  // ENTER IN GEBRUIKERSNAAM → GA NAAR WACHTWOORD
  usernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordInput.focus();
    }
  });

  // ENTER IN WACHTWOORD → SUBMIT FORM
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      loginForm.requestSubmit();
    }
  });

  // TOGGLE WACHTWOORD ZICHTBAAR/ONZICHTBAAR
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePasswordBtn.textContent = isPassword ? "Verberg" : "Toon";
    });
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

  // UITLOG KNOP
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("fcbreo-logged-in");
      showLogin();
    });
  }

  function showApp() {
    loginWrapper.style.display = "none";
    appWrapper.classList.add("show");
    appWrapper.setAttribute("aria-hidden", "false");

    // Redirect altijd naar NIEUWS na login
    sections.forEach((section) => {
      section.classList.toggle("active", section.id === "section-nieuws");
    });

    navButtons.forEach((btn) => {
      const target = btn.getAttribute("data-target");
      btn.classList.toggle("active", target === "nieuws");
    });
  }

  function showLogin() {
    // App verbergen, login tonen
    appWrapper.classList.remove("show");
    appWrapper.setAttribute("aria-hidden", "true");
    loginWrapper.style.display = "flex";

    // Form resetten en cursor in gebruikersnaam
    loginForm.reset();
    loginError.textContent = "";
    usernameInput.focus();
  }

  // NAVIGATIE TUSSEN PAGINA'S
  navButtons.forEach((btn) => {
    const target = btn.getAttribute("data-target");
    if (!target) return; // skip bv. logout button als die nav-btn heeft

    btn.addEventListener("click", () => {
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
