const express = require("express");
const app = express();
const session = require ('express-session');
const cookieParser = require('cookie-parser');
const log = require('./middlewares/log');

// Requerimientos de rutas
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const methodOverride = require('method-override');
const path = require('path');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public'))); // Configura los recursos estaticos dentro de la carpeta public
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use (session ({secret: 'Un mensaje secreto', resave : false , 
saveUninitialized : true}));


app.listen(3000, function(){
    console.log("Running on 3000");
});

// Middlewares propios a nivel de aplicacion

app.use(log);

// Rutas
app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);