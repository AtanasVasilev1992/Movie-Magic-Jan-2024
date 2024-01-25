const express = require("express");
const mongoose = require('mongoose')
const routes = require('./routes');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');

const app = express();
const port = 5000;

configHandlebars(app);
configExpress(app);

app.use(routes);

mongoose.connect(`mongodb://localhost:27017/magic-movies`)
    .then(() => {
        app.listen(port, () => console.log(`Server is listennig on port: ${port}...`));
        console.log(`DB Connected`)
    })
    .catch(err => console.log(`Cann't connect to DB!`));