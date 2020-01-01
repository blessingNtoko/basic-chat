const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const port = 4177;

app.use((req, res, next) => {
    // Setting header, allow access from any domain(or it can be specified)
    res.header("Access-Control-Allow-Origin", "*");
    // Accept if it has a content-type header(can also specify what type of request you want)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/contact', (req, res) => {
    console.log(req);
    console.log(res);
});

io.on('connection', (socket) => {
    console.log('A user has connected');

    socket.on('message', (message) => {
        console.log('A message has been emitted', message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});


http.listen(port, () => {
    console.log('listening on port: ', port);
});