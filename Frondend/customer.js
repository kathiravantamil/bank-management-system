// ==========================================
// Backend API
// ==========================================

const API_URL = "http://localhost:8080/accounts";


// ==========================================
// Get HTML Elements
// ==========================================

const customerTable = document.getElementById("customerTable");

const searchInput = document.getElementById("searchCustomer");

const addCustomerBtn = document.getElementById("addCustomerBtn");

const customerModal = document.getElementById("customerModal");

const closeModal = document.getElementById("closeModal");

const customerForm = document.getElementById("customerForm");


// ==========================================
// Load Customers
// ==========================================

async function loadCustomers() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load customers");
        }

        const customers = await response.json();

        displayCustomers(customers);

    } catch (error) {

        console.error("Error loading customers:", error);

        alert("Unable to load customers from backend.");

    }
}


// ==========================================
// Display Customers
// ==========================================

function displayCustomers(customers) {

    customerTable.innerHTML = "";

    customers.forEach(function (customer) {

        const row = `
            <tr>

                <td>${customer.id}</td>

                <td>${customer.accountNumber}</td>

                <td>${customer.accountHolderName}</td>

                <td>${customer.accountType}</td>

                <td>₹${customer.balance}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editCustomer(${customer.id})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteCustomer(${customer.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

        customerTable.innerHTML += row;

    });

}


// ==========================================
// Open Add Customer Modal
// ==========================================

addCustomerBtn.addEventListener("click", function () {

    customerModal.style.display = "flex";

});


// ==========================================
// Close Add Customer Modal
// ==========================================

closeModal.addEventListener("click", function () {

    customerModal.style.display = "none";

});


// ==========================================
// Add Customer
// ==========================================

customerForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Get form values

    const accountNumber =
        document.getElementById("accountNumber").value;

    const accountHolderName =
        document.getElementById("customerName").value;

    const accountType =
        document.getElementById("accountType").value;

    const balance =
        Number(document.getElementById("customerBalance").value);


    // Create customer object

    const newCustomer = {

        accountNumber: accountNumber,

        accountHolderName: accountHolderName,

        accountType: accountType,

        balance: balance

    };


    console.log("Sending customer:", newCustomer);


    try {

        // Send data to Spring Boot

        const response = await fetch(
            `${API_URL}/create`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newCustomer)
            }
        );


        // Check response

        if (response.ok) {

            const savedCustomer = await response.json();

            console.log(
                "Customer saved successfully:",
                savedCustomer
            );


            alert("Customer added successfully!");


            // Clear form

            customerForm.reset();


            // Close modal

            customerModal.style.display = "none";


            // Reload customers

            loadCustomers();

        } else {

            const errorMessage = await response.text();

            console.error(
                "Backend error:",
                errorMessage
            );

            alert(
                "Failed to add customer."
            );

        }

    } catch (error) {

        console.error(
            "Connection error:",
            error
        );

        alert(
            "Unable to connect to the backend."
        );

    }

});


// ==========================================
// Search Customer
// ==========================================

searchInput.addEventListener("input", async function () {

    const searchValue =
        searchInput.value.toLowerCase();


    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load customers");
        }

        const customers = await response.json();


        const filteredCustomers =
            customers.filter(function (customer) {

                return (
                    customer.accountHolderName
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    customer.accountNumber
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    customer.accountType
                        .toLowerCase()
                        .includes(searchValue)
                );

            });


        displayCustomers(filteredCustomers);


    } catch (error) {

        console.error(
            "Search error:",
            error
        );

    }

});


// ==========================================
// Edit Customer
// ==========================================

function editCustomer(id) {

    alert(
        "Edit functionality will be connected to the backend next."
    );

}


// ==========================================
// Delete Customer
// ==========================================

function deleteCustomer(id) {

    alert(
        "Delete functionality will be connected to the backend next."
    );

}


// ==========================================
// Close Modal When Clicking Outside
// ==========================================

customerModal.addEventListener(
    "click",
    function (event) {

        if (event.target === customerModal) {

            customerModal.style.display = "none";

        }

    }
);


// ==========================================
// Load Customers When Page Opens
// ==========================================

loadCustomers();