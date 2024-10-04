let loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(loginForm);
    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Data submitted:", data.data);
        alert("Login details submitted successfully!");
        loginForm.reset();  // Reset the form after submission
    })
    .catch(error => console.error('Error:', error));
});
// document.getElementById('login-button').addEventListener('click', function(e) {
//     // Ensure that this does not block form submission
//     e.preventDefault();   // Comment out this line if you have it
// });
