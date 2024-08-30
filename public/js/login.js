document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  const errorContainer = document.getElementById("error-msg");
  const innerDiv = document.createElement("div");
  innerDiv.classList.add("d-flex", "flex-row", "align-items-center");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic client-side validation
    if (!email || !password) {
      displayError("All fields must be filled");
      return;
    }

    if (!isValidEmail(email)) {
      displayError("Invalid email format");
      return;
    }

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Successful login - redirect to the dashboard
        window.location.href = "/dashboard";
      } else {
        // Display the error message returned by the server
        displayError(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      displayError("Something went wrong. Please try again.");
    }
  });

  function isValidEmail(email) {
    // Simple email validation regex
    return /\S+@\S+\.\S+/.test(email);
  }

  function displayError(message) {
    errorContainer.appendChild(innerDiv);
    innerDiv.innerHTML = "";
    innerDiv.innerHTML = `<p style="margin: 0; padding: 0;">${message}</p>`;
    errorContainer.classList.remove("d-none");
  }
});
