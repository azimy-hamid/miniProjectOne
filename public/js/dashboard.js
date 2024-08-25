// ADD USER ID TO INPUT FORMS

let userId = document.cookie;
let userIdString = userId.split("=")[1];

let userInputs = document.querySelectorAll("input[name='user_id']");
userInputs.forEach(function (input) {
  input.value = userIdString;
});

// POPULATE ACCOUNT'S TABLE AND ADD ALL THE ACCOUNT FOR THE USE IN THE FORM DROPDOWNS AND ALSO ADD THE DATA FOR THE CHARTS

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(`/api/accounts/${userIdString}`); // Adjust the path to match your route
    if (!response.ok) {
      throw new Error("Failed to fetch account IDs");
    }

    const accounts = await response.json();

    const accountTableBody = document.getElementById("account-table-Body");

    // Clear existing rows
    accountTableBody.innerHTML = "";

    // Populate table rows
    accounts.forEach((account) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${account._id}</td>
        <td>${account.user_id}</td>
        <td>${account.account_number}</td>
        <td>${account.account_type}</td>
        <td>${account.balance}</td>
      `;

      accountTableBody.appendChild(row);
    });

    // modify
    const depositAccountSelect = document.getElementById(
      "deposit-account-select"
    );
    console.log(depositAccountSelect);

    const transferAccountSelect = document.getElementById(
      "transfer-account-select"
    );

    // Populate all select elements
    accounts.forEach((account) => {
      const depositOption = document.createElement("option");
      depositOption.value = account._id;
      depositOption.textContent = `${account.account_number} - ${account.account_type}`;

      const transferOption = document.createElement("option");
      transferOption.value = account._id;
      transferOption.textContent = `${account.account_number} - ${account.account_type}`;

      // Append the options to their respective select elements
      depositAccountSelect.appendChild(depositOption);
      transferAccountSelect.appendChild(transferOption);
    });

    let balances = accounts.map((account) => {
      return account.balance;
    });
    console.log(balances);

    let accountNumbers = accounts.map((account) => {
      return account.account_number;
    });

    const accountsChart = document.getElementById("accountsChart");

    new Chart(accountsChart, {
      type: "line",
      data: {
        labels: accountNumbers,
        datasets: [
          {
            label: "Balance",
            data: balances,
            backgroundColor: ["#7a60ff", "#cd9ffa"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // Disable the legend
          },
        },
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(
      `/api/transactions/allTransaction/${userIdString}`
    ); // Adjust the path to match your route
    if (!response.ok) {
      throw new Error("Failed to fetch account IDs");
    }

    const allTransaction = await response.json();

    const allTransactionTableBody = document.getElementById(
      "transaction-table-Body"
    );

    console.log(allTransaction);

    // Clear existing rows
    allTransactionTableBody.innerHTML = "";

    // Populate table rows
    allTransaction.forEach((transaction) => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${transaction._id}</td>
          <td>${transaction.user_id}</td>
          <td>${transaction.account_id}</td>
          <td>${transaction.type}</td>
          <td>${transaction.amount}</td>
          <td>${transaction.description}</td>

        `;

      allTransactionTableBody.appendChild(row);
    });

    let depositCounter = 0;
    let transferCounter = 0;

    allTransaction.forEach((transaction) => {
      if (transaction.type.toLowerCase() === "deposit") {
        depositCounter++;
      } else if (transaction.type.toLowerCase() === "transfer") {
        transferCounter++;
      }
    });

    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Deposits", "Transfers"],
        datasets: [
          {
            data: [depositCounter, transferCounter],
            backgroundColor: ["#7a60ff", "#cd9ffa"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // Disable the legend
          },
        },
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(`/api/accounts/details/allAccounts`); // Adjust the path to match your route
    if (!response.ok) {
      throw new Error("Failed to fetch account IDs");
    }

    const allAccounts = await response.json();

    const recieverSelect = document.getElementById("transfer-reciever-select");

    // Populate all select elements
    allAccounts.forEach((account) => {
      if (account.user_id !== userIdString) {
        const option = document.createElement("option");
        option.value = account._id;
        option.textContent = account.account_number;

        recieverSelect.appendChild(option);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

// Validating the transfer form
document.addEventListener("DOMContentLoaded", () => {
  // ALL ELEMENTS FOR THE TRANSFER FORM
  const transferForm = document.getElementById("transfer-form");
  const transferUserIdInput = document.getElementById("transfer-user-id-input");
  const transferAccountSelect = document.getElementById(
    "transfer-account-select"
  );
  const transferRecieverSelect = document.getElementById(
    "transfer-reciever-select"
  );
  const transferTypeInput = document.getElementById("transfer-type-input");
  const transferAmountInput = document.getElementById("transfer-amount-input");
  const transferDescriptionInput = document.getElementById(
    "transfer-description-input"
  );
  const transferSubmitBtn = document.getElementById("transfer-submit-btn");

  //   ERROR CONTAINER TO DISPLAY THE ERROR MSG IF ANY OCCURS
  const transferErrorContainer = document.createElement("div");

  // Append the error container to the form
  transferForm.insertBefore(transferErrorContainer, transferForm.firstChild);
  // Style the error container
  transferErrorContainer.style.color = "red";
  transferErrorContainer.style.marginBottom = "1rem";

  function displayError(message) {
    transferErrorContainer.innerHTML = `<p>${message}</p>`;
  }

  transferForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Clear previous errors
    transferErrorContainer.innerHTML = "";

    const userId = transferUserIdInput.value;
    const accountId = transferAccountSelect.value;
    const reciever = transferRecieverSelect.value;
    const type = transferTypeInput.value;
    const amount = transferAmountInput.value;
    const description = transferDescriptionInput.value;

    // Basic client-side validation
    if (
      !userId ||
      !accountId ||
      !reciever ||
      !type ||
      !amount ||
      !description
    ) {
      displayError("All fields must be filled");
      return;
    }

    try {
      const response = await fetch("api/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          accountId,
          reciever,
          type,
          amount,
          description,
        }),
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
});

// DEPOSIT FORM VALIDATION
document.addEventListener("DOMContentLoaded", () => {
  // ALL ELEMENTS FOR THE DEPOSIT FORM
  const depositForm = document.getElementById("deposit-form");
  const depositUserIdInput = document.getElementById("deposit-user-id-input");
  const depositAccountSelect = document.getElementById(
    "deposit-account-select"
  );
  const depositTypeInput = document.getElementById("deposit-type-input");
  const depositAmountInput = document.getElementById("deposit-amount-input");
  const depositDescriptionInput = document.getElementById(
    "deposit-description-input"
  );
  const depositSubmitBtn = document.getElementById("deposit-submit-btn");

  const depositErrorContainer = document.createElement("div");
  depositForm.insertBefore(depositErrorContainer, depositForm.firstChild);

  depositErrorContainer.style.color = "red";
  depositErrorContainer.style.marginBottom = "1rem";

  function displayError(message) {
    depositErrorContainer.innerHTML = `<p>${message}</p>`;
  }

  depositForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Clear previous errors
    depositErrorContainer.innerHTML = "";

    const userId = depositUserIdInput.value;
    const accountId = depositAccountSelect.value;
    const type = depositTypeInput.value;
    const amount = depositAmountInput.value;
    const description = depositDescriptionInput.value;

    // Basic client-side validation
    if (!userId || !accountId || !type || !amount || !description) {
      displayError("All fields must be filled");
      return;
    }

    try {
      const response = await fetch("api/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          accountId,
          type,
          amount,
          description,
        }),
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
});
