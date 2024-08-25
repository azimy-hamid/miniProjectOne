document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const confirmPasswordInput = document.getElementById(
    "confirm-password-input"
  );
  const errorContainer = document.createElement("div");

  // Append the error container to the form
  signupForm.insertBefore(errorContainer, signupForm.firstChild);

  // Style the error container
  errorContainer.style.color = "red";
  errorContainer.style.marginBottom = "1rem";

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Clear previous errors
    errorContainer.innerHTML = "";

    const name = nameInput.value;
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Basic client-side validation
    if (!name || !email || !password || !confirmPassword) {
      displayError("All fields must be filled");
      return;
    }

    if (!isValidEmail(email)) {
      displayError("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      displayError("Confirm your password please!");
      return;
    }

    if (!isStrongPassword(password)) {
      displayError(
        "Password not strong enough! Must be at least 8 characters long, contain uppercase and lowercase letters, and a special character."
      );
      return;
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        displayError(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      displayError("Something went wrong. Please try again.");
    }
  });

  function isStrongPassword(password) {
    // Check if password is at least 8 characters long
    // Contains at least one lowercase letter, one uppercase letter, one digit, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  }

  function isValidEmail(email) {
    // Simple email validation regex
    return /\S+@\S+\.\S+/.test(email);
  }

  function displayError(message) {
    errorContainer.innerHTML = `<p>${message}</p>`;
  }
});
