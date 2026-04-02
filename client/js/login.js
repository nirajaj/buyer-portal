const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("message");

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;

  setTimeout(() => {
    messageBox.className = "message";
    messageBox.textContent = "";
  }, 3000);
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      return showMessage(data.message || "Login failed.", "error");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    showMessage("Login successful. Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  } catch (error) {
    showMessage("Something went wrong. Please try again.", "error");
  }
});