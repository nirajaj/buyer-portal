const registerForm = document.getElementById("registerForm");
const messageBox = document.getElementById("message");

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;

  setTimeout(() => {
    messageBox.className = "message";
    messageBox.textContent = "";
  }, 3000);
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      return showMessage(data.message || "Registration failed.", "error");
    }

    showMessage("Registration successful. Redirecting to login...", "success");

    setTimeout(() => {
      window.location.href = "/";
    }, 1200);
  } catch (error) {
    showMessage("Something went wrong. Please try again.", "error");
  }
});