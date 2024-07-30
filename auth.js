document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulated user data - replace with actual user validation
    const validUsername = 'Lokesh kale';
    const validPassword = 'Kale@123';

    if (username === validUsername && password === validPassword) {
       
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', username);

       
        window.location.href = 'cart.html';
    } else {
        alert('Invalid username or password');
    }
});
