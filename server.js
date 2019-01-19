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

    console.log(str);

    // Look at the string, see if it's empty
    // If so, create new date, send back correctly formatted object

    // If not, check if string fits ITC format
    // Create new date, return in correct format

    // If not, check if it's a valid integer
    // Create new date, return in correct format

    // If none of those, return invalid date object

    res.send(req.params);
});

app.listen(3000, () => {
    console.log('App running on port 3000!');
});
