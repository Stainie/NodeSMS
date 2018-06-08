const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const morgan = require('morgan');
const socketIO = require('socket.io');
const app = express();

/* ----- Logging Errors ----- */
app.use(morgan('dev'));

/* ----- Init Nexmo ----- */
const nexmo = new Nexmo({
    apiKey: '651c2883',
    apiSecret: 'j9INz2kAC82Dgq1Y'
}, { debug: true });

/* ----- Template Engine Setup (Middleware) ----- */
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

/* ----- Public folder ----- */
app.use(express.static(__dirname + '/public'));

/* ----- Body Parser (Middleware) ----- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ----- Index Route - GET ----- */
app.get('/', (req, res, next) => {
    res.render('index');
});

/* ----- Catch from Submit - POST ----- */
app.post('/', (req, res, next) => {
    const number = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(
        '381601356868', number, text, { type: 'unicode' },
        (err, responseData) => {
            if (err) {
                console.log(err);
            }
            else {
                console.dir(responseData);
            }
        }
    );
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});


module.exports = app;