
const API_URL = "http://localhost:8080/accounts";

const transactionTable =
    document.getElementById("transactionTable");

const searchTransaction =
    document.getElementById("searchTransaction");

let transactions = [];

async function loadTransactions() {
    transactionTable.innerHTML =
        '<tr><td colspan="6">Loading transactions...</td></tr>';

    try {
        const accountsResponse = await fetch(API_URL);

        if (!accountsResponse.ok) {
            throw new Error("Unable to load accounts");
        }

        const accounts = await accountsResponse.json();

        const results = await Promise.all(
            accounts.map(async function (account) {
                const response = await fetch(
                    `${API_URL}/${encodeURIComponent(account.accountNumber)}/transactions`
                );

                if (!response.ok) {
                    throw new Error(
                        "Unable to load transactions for " +
                        account.accountNumber
                    );
                }

                const history = await response.json();

                return history.map(function (transaction) {
                    return {
                        id: transaction.id,
                        accountNumber: transaction.accountNumber,
                        customer: account.accountHolderName,
                        type: transaction.transactionType,
                        amount: transaction.amount,
                        date: transaction.transactionDate
                            ? new Date(
                                transaction.transactionDate
                            ).toLocaleString()
                            : "N/A",
                        status: "Success"
                    };
                });
            })
        );

        transactions = results.flat();
        displayTransactions(getFilteredTransactions());

    } catch (error) {
        console.error(error);

        transactionTable.innerHTML =
            '<tr><td colspan="6">' +
            'Unable to load transactions. Check the console.' +
            '</td></tr>';
    }
}

function displayTransactions(data) {
    transactionTable.innerHTML = "";

    if (data.length === 0) {
        transactionTable.innerHTML =
            '<tr><td colspan="6">No transactions found.</td></tr>';
        return;
    }

    data.forEach(function (transaction) {
        const row = document.createElement("tr");

        [
            transaction.id,
            transaction.customer,
            transaction.type,
            "₹" + transaction.amount,
            transaction.date,
            transaction.status
        ].forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value ?? "N/A";
            row.appendChild(cell);
        });

        transactionTable.appendChild(row);
    });
}

function getFilteredTransactions() {
    const value = searchTransaction.value
        .trim()
        .toLowerCase();

    return transactions.filter(function (transaction) {
        return (
            String(transaction.customer).toLowerCase().includes(value) ||
            String(transaction.accountNumber).toLowerCase().includes(value) ||
            String(transaction.type).toLowerCase().includes(value)
        );
    });
}

searchTransaction.addEventListener("input", function () {
    displayTransactions(getFilteredTransactions());
});

loadTransactions();
