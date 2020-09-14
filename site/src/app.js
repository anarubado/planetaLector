const express = require("express");
const app = express();
const session = require ('express-session');
const cookieParser = require('cookie-parser');
const log = require('./middlewares/log');
const categories = require ('./middlewares/categories');
const cors = require('cors');

// Requerimientos de rutas
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const apiInfoRouter = require('./routes/api/apiInfo');
const apiUsersRouter = require('./routes/api/apiUsers');
const apiProductsRouter = require('./routes/api/apiProducts');


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
app.use(cors());

const port = process.env.PORT || 3030

app.listen(port, function(){
    console.log("Running on " + port);
});

// Middlewares propios a nivel de aplicacion

app.use(categories);
app.use(log);

// Rutas
app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.use('/api/info', apiInfoRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);


