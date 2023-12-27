document.addEventListener('DOMContentLoaded', () => {
    // Connect to the Socket.IO server
    const socket = io();

    // Function to add a comment
    window.addComment = function () {
        const commentInput = document.getElementById('commentInput');
        const comment = commentInput.value.trim();
        if (comment !== '') {
            // Emit the comment to the server
            socket.emit('newComment', comment);
            commentInput.value = ''; // Clear the input field
        }
    };

    // Function to display a new comment
    function displayComment(comment) {
        const commentsList = document.getElementById('commentsList');
        const li = document.createElement('li');
        li.textContent = comment;
        commentsList.appendChild(li);
    }

    // Listen for new comments from the server
    socket.on('newComment', (comment) => {
        displayComment(comment);
    });
});

// Mock login function
window.login = function () {
    alert('Login functionality would be implemented here.');
    // You can add actual login logic using JavaScript or connect to a server.
};
server.js:

js
Copy code
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for new comments
    socket.on('newComment', (comment) => {
        console.log('New Comment:', comment);
        // Broadcast the new comment to all connected clients
        io.emit('newComment', comment);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});