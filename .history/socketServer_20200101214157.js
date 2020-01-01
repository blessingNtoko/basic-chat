const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
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
    res.send('Hello World');
});

app.post('/', bodyParser.json(), (req, res) => {

    const fromContactForm = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    };

    console.log('Req body', fromContactForm);
    // console.log('Res body', res.body);
    res.send("got it");

    const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'bntoko',
            pass: 'googleCherry4177'
        }
    });

    const mailOptions = {
        from: fromContactForm['name'],
        to: 'bntoko@gmail.com',
        subject: 'Sending Email using Node.js',
        text: fromContactForm['message'].toString()
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
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