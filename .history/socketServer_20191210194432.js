const app = require('express')();
const http = require('http').createServer(app);
const port = 4177;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

http.listen(port, () => {
    console.log('listening on port: ', port);
});