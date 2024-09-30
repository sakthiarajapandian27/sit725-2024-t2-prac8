// socket.js
const initializeSocket = (profileData) => {
    const socket = io(); // Initialize socket connection

    socket.emit('user_connected', {
        username: profileData ? profileData.firstName : "Guest",
    });

    socket.on('welcome_message', (data) => {
        document.getElementById('welcomeMessage').innerText = data.message;
    });
};
