const express = require('express');
const cors = require('cors');
const moment = require('moment');

let app = new express();

app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/hello', (req, res) => {
    res.send('Hello world!');
});

app.get('/api/timestamp', (req, res) => {
    let d = new Date();

    res.send({
        "unix": d.getTime(),
        "utc": d.toUTCString()
    });
});

app.get('/api/timestamp/:datestring', (req, res) => {
    let str = req.params.datestring;

    if(moment(str).isValid()) {
        let d = moment(str);

        res.send({
            "unix": d.unix(),
            "utc": d.utc()
        });
    } else {
        res.send({
            "error": "Invalid Date"
        });
    }
});

app.listen(3000, () => {
    console.log('App running on port 3000!');
});
