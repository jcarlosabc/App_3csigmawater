const express = require('express');
const conexion = require('../database/cn');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crud = require('../controllers/crud');

// licencia_trasera
let myArray = [];
 
const rutaAlmacen = multer.diskStorage({
    destination: function (req, file, callback) {
        const rutaLicencia = path.join(__dirname, '../public/imglicencias')
        callback(null, rutaLicencia);
    },
      
    filename: function (req, file, callback) {
        console.log(myArray)
        const nomFile = req.body.nombres+"_" + req.body.apellidosform +"_licencia_sigmaWater_" + file.originalname;
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

/*=============================================================*/
router.post('/enviar', multiupload, crud.enviar);
/*=============================================================*/






// Redireccionar al Login - Ruta principal, local=> localhost:3000 || server=> app.3csigmawater.com
router.get('/', (req, res) => {
    // res.redirect('/login') // Local=> localhost:3000 || Server=>app.3csigmawater.com/login
    res.redirect('/register')
});


router.get('/mensaje', (req, res) => {
    res.render('mensaje', {
        msgExito: false
    })
});

router.get('/mostrardatos', (req, res) => {

    var sql = "SELECT * FROM tblformulario_registro LIMIT 1";
    conexion.query(sql, function (err, result) {
    if (err) throw err;
    const hola = JSON.parse(result[0].licencia_conduccion)
    console.log("TEST1 >>> ",hola.frontal);
    console.log("TEST2 >>> ",hola.trasera);
    res.render('./mostrardatos', {hola})
  });
    // console.log(JSON.parse(resul[0]))

    // conexion.query('SELECT * FROM tblformulario_registro', (error, results) => {
    //     if (error) {
    //         throw error;
    //     } else {

    //        const  img1=  JSON.parse(results.licencia_conduccion) // CONVERTIR  JSON A UN OBJETO
    //        console.log(img1)
    //         res.render('./mostrardatos', {
    //             results: results, 
    //             img1
    //         });

    //     }


    // });

});

/*==================RUTA PARA CREAR REGISTRO =====================*/

router.get('/register', (req, res) => {
    res.render('register');
})



module.exports = router;