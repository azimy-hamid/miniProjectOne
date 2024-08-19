// ADD USER ID TO INPUT FORMS

let userId = document.cookie;
let userIdString = userId.split("=")[1];

let userInputs = document.querySelectorAll("input[name='user_id']");
userInputs.forEach(function (input) {
  input.value = userIdString;
});

// POPULATE ACCOUNT'S TABLE
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

    const accountSelects = document.querySelectorAll(".accountSelect");

    // Populate all select elements
    accounts.forEach((account) => {
      const option = document.createElement("option");
      option.value = account._id;
      option.textContent = `${account.account_number} - ${account.account_type}`;

      // Append the option to all select elements
      accountSelects.forEach((select) => {
        select.appendChild(option.cloneNode(true));
      });
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
              label: "Number of Deposits",
              data: [depositCounter, transferCounter],
              backgroundColor: ["#7a60ff", "#cd9ffa"],
              borderWidth: 1,
            },
          ],
        },
        options: {},
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("/api/accounts/details/allAccounts");
  if (!response.ok) {
    throw new Error("Failed to fetch account IDs");
  }

  const allAccounts = await response.json();

  const recieverSelects = document.querySelectorAll(".recieverSelect");

  console.log(allAccounts);
  // Populate all select elements
  allAccounts.map((acc) => {
    if (acc.user_id !== userIdString) {
      const option = document.createElement("option");
      option.value = acc._id;
      option.textContent = `${acc.account_number}`;

      recieverSelects.forEach((select) => {
        select.appendChild(option.cloneNode(true));
      });
    }
  });
});
