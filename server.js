require("dotenv").config({ path: ".env", debug: true });
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;


app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

const api = require('./routes/routes');
app.use('/api/v1/', api);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});


app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));