const express = require("express");
const mongoose = require('mongoose');
const routes = require('./routes');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const { PORT } = require('./config/config');

const app = express();

configHandlebars(app);
configExpress(app);

app.use(routes);

mongoose.connect(`mongodb://localhost:27017/magic-movies`)
    .then(() => {
        app.listen(PORT, () => console.log(`Server is listennig on port: ${PORT}...`));
        console.log(`DB Connected`)
    })
    .catch(err => console.log(`Cann't connect to DB!`));