const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();

            // Save JWT token
            localStorage.setItem("token", data.token);

            alert("Login successful!");

            // Go to dashboard
            window.location.href = "dashboard.html";

        } else {
            alert("Invalid email or password!");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to connect to the backend.");
    }
});