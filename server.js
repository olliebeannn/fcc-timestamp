const express = require('express');
const cors = require('cors');

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

    let d;

    // Assume its a unix timestamp if is an int
    if (Number.isInteger(Number(str))) {
        d = new Date(Number(str));
    }
    // Else try making a date assuming it's ISO compliant
    else {
        d = new Date(str);
    }

    // Check if it's valid; if not, return an error
    if(d.toUTCString() === 'Invalid Date') {
        res.send({
            "error": "Invalid Date"
        });
    } else {
        res.send({
            "unix": d.getTime(),
            "utc": d.toUTCString()
        });
    }
});

app.listen(3000, () => {
    console.log('App running on port 3000!');
});
