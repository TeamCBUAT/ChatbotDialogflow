const express = require('express');
const app = express(); //esta constante es el serv
const path = require('path');
const morgan = require('morgan');


//settings
app.set('port', 3000);
app.set('view engine', 'ejs');

//middleweares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes'))

//static files (js img icon etc)
app.use(express.static(path.join(__dirname, 'public')))

//listening the server
app.listen(app.get('port'),() =>{//puerto
console.log('puerto', app.get('port'));
});