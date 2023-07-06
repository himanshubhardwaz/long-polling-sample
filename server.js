const http = require('http');

// Simulate a long-running process
function simulateLongRunningProcess() {
    return new Promise(resolve => {
        setTimeout(() => {
            const messages = [
                'Hello!',
                'How are you?',
                'This is a long polling example.',
                'Long polling allows real-time updates from the server.',
            ];
    
            const message = messages[Math.floor(Math.random() * messages.length)];
            resolve({ message });
        }, 3000);
    });
}

// Create a server
const server = http.createServer((req, res) => {
    // Enable CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Replace with your client-side URL
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/') {
        simulateLongRunningProcess()
            .then(response => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response));
            })
            .catch(error => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
