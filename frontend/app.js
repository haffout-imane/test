const loginPage = document.getElementById("login-page");
const helloPage = document.getElementById("hello-page");
const usernameSpan = document.getElementById("username");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const logoutBtn = document.getElementById("logout-btn");

const API_URL = "http://localhost:3000";

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginError.textContent = "";

  const form = new FormData(loginForm);
  const email = form.get("email");
  const password = form.get("password");

  try {
    const resp = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // to send & receive cookies
      body: JSON.stringify({ email, password }),
    });

    if (!resp.ok) {
      const err = await resp.json();
      loginError.textContent = err.message || "Login failed";
      return;
    }

    showHelloPage();
  } catch (err) {
    console.error("Login error", err);
    loginError.textContent = "Network or server error";
  }
});

async function showHelloPage() {
  try {
    const resp = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    console.log(resp);
    if (!resp.ok) {
      throw new Error("Not logged in");
    }
    const user = await resp.json();
    usernameSpan.textContent = user.name || user.email;
    loginPage.style.display = "none";
    helloPage.style.display = "block";
  } catch (err) {
    console.error("Error fetching me", err);

    loginPage.style.display = "block";
    helloPage.style.display = "none";
  }
}

logoutBtn.addEventListener("click", async () => {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  helloPage.style.display = "none";
  loginPage.style.display = "block";
});

// Check if already logged in at startup
showHelloPage();
