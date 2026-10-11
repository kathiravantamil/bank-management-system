
let customers = [
    {
        id: 1,
        name: "Arun",
        balance: 50000
    },
    {
        id: 2,
        name: "Ravi",
        balance: 25000
    },
    {
        id: 3,
        name: "Kumar",
        balance: 70000
    }
];


let transactions = [

    {
        customer: "Arun",
        type: "Deposit",
        amount: 5000,
        date: "21/08/26"
    },

    {
        customer: "Ravi",
        type: "Withdraw",
        amount: 2000,
        date: "21/08/26"
    },

    {
        customer: "Kumar",
        type: "Deposit",
        amount: 3000,
        date: "20/08/26"
    }

];


// Customer count

document.getElementById("customerCount").innerText =
    customers.length;


// Account count

document.getElementById("accountCount").innerText =
    customers.length;


// Transaction count

document.getElementById("transactionCount").innerText =
    transactions.length;


// Display recent transactions

let table = document.getElementById("recentTransactions");


transactions.forEach(function (transaction, index) {

    let row = `

        <tr>

            <td>${index + 1}</td>

            <td>${transaction.customer}</td>

            <td>${transaction.type}</td>

            <td>₹${transaction.amount}</td>

            <td>${transaction.date}</td>

        </tr>

    `;

    table.innerHTML += row;

});