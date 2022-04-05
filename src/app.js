const express = require('express');
const app = express();
const path = require('path');
const flash = require('connect-flash')
// const {body, validationResult}= require('express-validator');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//RUTAS
app.use('/', require('./routers')); // Llamando a la Ruta Principal

/******** Variables Globales ********/
app.use((req, res, next) => {
    // app.locals.success = req.flash('success');
    app.locals.msgExito = req.msgExito;
    next();
})

// static  files
app.use(express.static(path.join(__dirname, 'public')));

/*========= ESCUCHANDO AL SERVIDOR EN EL PUERTO 3000 ===========*/
app.listen(3000, () => {
    console.log('//--SERVIDOR CORRIENDO--// en http://localhost:3000')

});