const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 4177;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', () => {
    console.log('A user has connected');
    io.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});


http.listen(port, () => {
    console.log('listening on port: ', port);
});