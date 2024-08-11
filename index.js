const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json())

const mongoUri = process.env.MONGGO_URL;


routes(app)


// Route cơ bản
app.get('/', (req, res) => {
    res.send('Website NodeJS');
});

// Kết nối MongoDB
mongoose.connect(mongoUri, {
    dbName: process.env.MONGO_DB
})
.then(() => {
    console.log('Connect Database SuccessFul');
})
.catch((err) => {
    console.log('Error connecting to database: ', err);
});





// Lắng nghe port
app.listen(port, () => {
    console.log('Server running on port ' + port);
});
