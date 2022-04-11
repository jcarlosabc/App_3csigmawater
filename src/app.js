const express = require('express');
const app = express();
const dotenv = require('dotenv')
const path = require('path');
const cookieParser = require('cookie-parser');

// const {body, validationResult}= require('express-validator');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// seteando a cookie parser
app.use(cookieParser())

//seteamos las variables de entorno
dotenv.config({patch:'./env/.env'});


//RUTAS
app.use('/', require('./routers')); // Llamando a la Ruta Principal


app.use(function(req, res, next){
if (!req.correo)
res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
next();

});



/******** Variables Globales ********/
// app.use((req, res, next) => {
    // app.locals.success = req.flash('success');
    // app.locals.nomArchivo = req.nomArchivo
    // app.locals.msgExito = req.msgExito;
//     next();
// })

// static  files
app.use(express.static(path.join(__dirname, '/public')));

/*========= ESCUCHANDO AL SERVIDOR EN EL PUERTO 3000 ===========*/
app.listen(3000, () => {
    console.log('//--SERVIDOR CORRIENDO--// en http://localhost:3000')

});