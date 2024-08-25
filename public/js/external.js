document.addEventListener("DOMContentLoaded", async function () {
  try {
    let response = await fetch("https://api.sampleapis.com/fakebank/accounts");
    // let response = await fetch("");

    let data = await response.json();

    const firstGraphCanvas = document.getElementById("first-graph-canvas");

    let totalDebit = 0;
    let totalCredit = 0;
    let transactionDateArr = [];
    let allCreditArr = [];
    let allDebitArr = [];

    data.map((transaction, index) => {
      if (transaction.debit) {
        totalDebit += transaction.debit;
      }

      if (transaction.credit) {
        totalCredit += transaction.credit;
      }

      transactionDateArr.push(transaction.transactionDate);
      allCreditArr.push(transaction.credit);
      allDebitArr.push(transaction.debit);
    });

    new Chart(firstGraphCanvas, {
      type: "bar",
      data: {
        labels: ["Total Amount"], // Only one label for the x-axis
        datasets: [
          {
            label: "Total Amount of Debit", // First legend item
            data: [totalDebit],
            backgroundColor: "rgba(255, 99, 132, 0.2)", // Color for the first bar
            borderColor: "rgba(255, 99, 132, 1)", // Border color for the first bar
            borderWidth: 1,
          },
          {
            label: "Total Amount of Credit", // Second legend item
            data: [totalCredit],
            backgroundColor: "rgba(54, 162, 235, 0.2)", // Color for the second bar
            borderColor: "rgba(54, 162, 235, 1)", // Border color for the second bar
            borderWidth: 1,
          },
        ],
      },
      options: {
        resposive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },

        plugins: {
          legend: {
            position: "top",
          },

          title: {
            display: true,
            text: "Totals for depoit and credits",
          },
        },
      },
    });

    const secondGraphCanvas = document
      .getElementById("second-graph-canvas")
      .getContext("2d");

    new Chart(secondGraphCanvas, {
      type: "line", // Type of chart
      data: {
        labels: transactionDateArr,
        datasets: [
          {
            label: "All Credit Over the time", // Label for the dataset
            data: allCreditArr,
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Background color under the line
            borderColor: "rgba(75, 192, 192, 1)", // Line color
            borderWidth: 1, // Width of the line
            fill: true, // Fill the area under the line
          },
        ],
      },
      options: {
        responsive: true, // Make the chart responsive
        scales: {
          x: {
            beginAtZero: true, // Ensure the x-axis starts at zero
          },
          y: {
            beginAtZero: true, // Ensure the y-axis starts at zero
          },
        },
        plugins: {
          legend: {
            display: true, // Show the legend
            position: "top", // Position of the legend
          },
          tooltip: {
            enabled: true, // Enable tooltips
          },
        },
      },
    });

    const thirdGraphCanvas = document
      .getElementById("third-graph-canvas")
      .getContext("2d");

    new Chart(thirdGraphCanvas, {
      type: "line", // Type of chart
      data: {
        labels: transactionDateArr,
        datasets: [
          {
            label: "All Debits Over the time", // Label for the dataset
            data: allDebitArr,
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Background color under the line
            borderColor: "rgba(75, 192, 192, 1)", // Line color
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 1, // Width of the line
            fill: false, // Fill the area under the line
            showLine: false,
          },
        ],
      },
      options: {
        responsive: true, // Make the chart responsive
        scales: {
          x: {
            beginAtZero: true, // Ensure the x-axis starts at zero
          },
          y: {
            beginAtZero: true, // Ensure the y-axis starts at zero
          },
        },
        plugins: {
          legend: {
            display: true, // Show the legend
            position: "top", // Position of the legend
          },
          tooltip: {
            enabled: true, // Enable tooltips
          },
        },
      },
    });

    console.log(allCreditArr);

    const allTransactionTableBody = document.getElementById(
      "transaction-table-Body"
    );

    // Clear existing rows
    allTransactionTableBody.innerHTML = "";

    // Populate table rows
    data.forEach((transaction) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${transaction.id}</td>
      <td>${transaction.category}</td>
            <td>${transaction.credit}</td>
            <td>${transaction.debit}</td>
            <td>${transaction.description}</td>
            <td>${transaction.transactionDate}</td>
  
          `;

      allTransactionTableBody.appendChild(row);
    });

    // ADD ALL COLUMNS IN THE DROPDOWN
    let columnSelect = document.getElementById("columns-dropdown");

    let dataColumnsName = Object.getOwnPropertyNames(data[0]);

    dataColumnsName.forEach((column) => {
      let opt = document.createElement("option");
      opt.value = column;
      opt.innerHTML = column.toUpperCase();
      columnSelect.appendChild(opt);
    });

    let ascendingRadio = document.getElementById("ascending");
    let descendingRadio = document.getElementById("descending");
    let sortBtn = document.getElementById("sort-btn");

    sortBtn.addEventListener("click", () => {
      let selectedCol = columnSelect.value;
      let sortedData = [];

      if (ascendingRadio.checked) {
        if (
          typeof data[0][selectedCol] === "number" ||
          data[0][selectedCol] === null
        ) {
          console.log("number col");
          console.log(data[0][selectedCol]);
          console.log(typeof data[0][selectedCol]);

          // Numeric sort
          sortedData = data.sort((a, b) => {
            return a[selectedCol] - b[selectedCol];
          });
        } else {
          console.log("string col");
          console.log(data[0][selectedCol]);
          console.log(typeof data[0][selectedCol]);

          // String sort
          sortedData = data.sort((a, b) => {
            let colA = a[selectedCol].toString().toUpperCase();
            let colB = b[selectedCol].toString().toUpperCase();
            if (colA < colB) {
              return -1;
            }
            if (colA > colB) {
              return 1;
            }
            return 0;
          });
        }
      } else if (descendingRadio.checked) {
        if (
          typeof data[0][selectedCol] === "number" ||
          data[0][selectedCol] === null
        ) {
          console.log("number col");
          console.log(data[0][selectedCol]);
          console.log(typeof data[0][selectedCol]);

          // Numeric sort
          sortedData = data.sort((a, b) => {
            return b[selectedCol] - a[selectedCol];
          });
        } else {
          console.log("string col");
          console.log(data[0][selectedCol]);
          console.log(typeof data[0][selectedCol]);

          // String sort
          sortedData = data.sort((a, b) => {
            let colA = a[selectedCol].toString().toUpperCase();
            let colB = b[selectedCol].toString().toUpperCase();
            if (colA < colB) {
              return 1;
            }
            if (colA > colB) {
              return -1;
            }
            return 0;
          });
        }
      }

      console.log(sortedData);
      allTransactionTableBody.innerHTML = "";

      sortedData.forEach((transaction) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${transaction.id}</td>
          <td>${transaction.category}</td>
                <td>${transaction.credit}</td>
                <td>${transaction.debit}</td>
                <td>${transaction.description}</td>
                <td>${transaction.transactionDate}</td>

              `;

        allTransactionTableBody.appendChild(row);
      });
    });

    let filterDropdown = document.getElementById("filter-dropdown");
    let filteringSection = document.getElementById("filtering-container");

    filterDropdown.addEventListener("change", () => {
      if (filterDropdown.value === "debit") {
        // check if the input already exists
        let input = document.getElementById("filter-input");
        if (!input) {
          input = document.createElement("input");
          input.setAttribute("id", "filter-input");
          input.setAttribute(
            "placeholder",
            "Enter the minimum debit to filter by"
          );
          input.classList.add("form-control");
          filteringSection.appendChild(input);

          //   Add a filter btn
          let filterBtn = document.createElement("button");
          filterBtn.setAttribute("id", "filter-btn");
          filterBtn.classList.add("btn", "btn-dark");
          filterBtn.innerHTML = "Filter";
          filteringSection.appendChild(filterBtn);
        } else {
          input.setAttribute(
            "placeholder",
            "Enter the minimum debit to filter by"
          );
          console.log("else block");
        }
      } else if (filterDropdown.value === "credit") {
        let input = document.getElementById("filter-input");
        if (!input) {
          input = document.createElement("input");
          input.setAttribute("id", "filter-input");
          input.setAttribute(
            "placeholder",
            "Enter the minimum credit to filter by"
          );
          input.classList.add("form-control");
          filteringSection.appendChild(input);

          //   Add a filter btn
          let filterBtn = document.createElement("button");
          filterBtn.setAttribute("id", "filter-btn");
          filterBtn.classList.add("btn", "btn-dark");
          filterBtn.innerHTML = "Filter";
          filteringSection.appendChild(filterBtn);
        } else {
          input.setAttribute(
            "placeholder",
            "Enter the minimum credit to filter by"
          );
          console.log("else block");
        }
      } else if (filterDropdown.value === "date") {
        let input = document.getElementById("filter-input");
        if (!input) {
          input = document.createElement("input");
          input.setAttribute("id", "filter-input");
          input.setAttribute("placeholder", "YYYY-MM-DD");
          input.classList.add("form-control");
          filteringSection.appendChild(input);

          //   Add a filter btn
          let filterBtn = document.createElement("button");
          filterBtn.setAttribute("id", "filter-btn");
          filterBtn.classList.add("btn", "btn-dark");
          filterBtn.innerHTML = "Filter";
          filteringSection.appendChild(filterBtn);
        } else {
          input.setAttribute("placeholder", "YYYY-MM-DD");
          console.log("else block");
        }
      }

      let filterBtn = document.getElementById("filter-btn");

      filterBtn.addEventListener("click", () => {
        let filterBy = document.getElementById("filter-input").value;

        let filteredArray = [];
        if (filterDropdown.value === "debit") {
          filteredArray = data.filter((value, index, array) => {
            return value.debit >= filterBy;
          });

          allTransactionTableBody.innerHTML = "";

          filteredArray.forEach((transaction) => {
            const row = document.createElement("tr");

            row.innerHTML = `
              <td>${transaction.id}</td>
              <td>${transaction.category}</td>
                    <td>${transaction.credit}</td>
                    <td>${transaction.debit}</td>
                    <td>${transaction.description}</td>
                    <td>${transaction.transactionDate}</td>
    
                  `;

            allTransactionTableBody.appendChild(row);
          });
        } else if (filterDropdown.value === "credit") {
          filteredArray = data.filter((value, index, array) => {
            return value.credit >= filterBy;
          });

          allTransactionTableBody.innerHTML = "";

          filteredArray.forEach((transaction) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${transaction.id}</td>
                <td>${transaction.category}</td>
                      <td>${transaction.credit}</td>
                      <td>${transaction.debit}</td>
                      <td>${transaction.description}</td>
                      <td>${transaction.transactionDate}</td>
      
                    `;

            allTransactionTableBody.appendChild(row);
          });
        } else if (filterDropdown.value === "date") {
          let filterByDate = new Date(filterBy);
          //   console.log(filterByDate);
          filteredArray = data.filter((value, index, array) => {
            let changeToDate = new Date(value.transactionDate);
            // console.log(value);
            return changeToDate >= filterByDate;
          });

          allTransactionTableBody.innerHTML = "";

          filteredArray.forEach((transaction) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${transaction.id}</td>
                <td>${transaction.category}</td>
                      <td>${transaction.credit}</td>
                      <td>${transaction.debit}</td>
                      <td>${transaction.description}</td>
                      <td>${transaction.transactionDate}</td>
      
                    `;

            allTransactionTableBody.appendChild(row);
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});
