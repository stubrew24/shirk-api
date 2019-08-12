const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World')
});

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/shirk", {useNewUrlParser: true})
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

userRoutes(app);
postRoutes(app);

app.listen('3333', console.log('Listening on port 3333'));