const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const conexion = require('../database/db')
const path = require('path');
const multer = require('multer');




let myArray = [];
 
const rutaAlmacen = multer.diskStorage({
    destination: function (req, file, callback) {
        const rutaLicencia = path.join(__dirname, '../public/imglicencias')
        callback(null, rutaLicencia);
    },
      
    filename: function (req, file, callback) {
        console.log(myArray)
        const nomFile = "_licencia_sigmaWater_" + file.originalname;
        // const nomFile = req.body.nombres+"_" + req.body.apellidosform +"_licencia_sigmaWater_" + file.originalname;
        myArray.push(nomFile);
        req.nomArchivo = myArray
        // console.log("HOLA Xd", req.nomArchivo)
        callback(null,  nomFile);
    }

});



const cargar = multer ({
    storage: rutaAlmacen,
});

const multiupload = cargar.fields([{ name:'licencia' }, {name:'licencia_trasera' }]);



//TODO: VISTAS
/*================== RUTAS PARA LAS VISTAS =====================*/

router.get('/', (req, res) => {
    // res.redirect('/login') // Local=> localhost:3000 || Server=>app.3csigmawater.com/login
    res.render('index')
});

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})

router.get('/dashboard', authController.isAuthenticated, (req, res)=>{    
    res.render('dashboard', {correo:req.correo})
})

/*==================RUTAS =====================*/


//TODO: router para los métodos del controller

/*=============================================================*/
router.post('/enviar', multiupload, authController.enviar);
/*=============================================================*/
router.post('/login', authController.login)
/*=============================================================*/
router.get('/logout', authController.logout)
/*=============================================================*/

module.exports = router