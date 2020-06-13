const express = require("express");
const app = express();

// Requerimientos de rutas
const homeRoutes = require('./routes/home');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/registro');
const productosRoutes = require('./routes/productos');
const carritoRoutes = require('./routes/carrito');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(3000, function(){
    console.log("Running on 3000");
});

// Rutas
app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/registro', registerRoutes);
app.use('/productos', productosRoutes);
app.use('/carrito', carritoRoutes);