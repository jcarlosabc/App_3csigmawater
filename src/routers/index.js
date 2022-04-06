const express = require('express');
const conexion = require('../database/cn');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crud = require('../controllers/crud');





const rutaAlmacen = multer.diskStorage({
    destination: function (req, file, callback) {
        const rutaLicencia = path.join(__dirname, '../public/imglicencias')
        callback(null, rutaLicencia);
    },
      
    filename: function (req, file, callback) {
        console.log('file');
        callback(null, req.body.nombres+"_" + req.body.apellidosform +"_licencia anversa_sigmaWater_" + file.originalname );
    }

});

const cargar = multer({
    storage: rutaAlmacen,
 limits:{fileSize:1000000},

 fileFilter:(req, file, callback) =>{

    const filetypes = /jpg|png|/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

        if(mimetype && extname){
            return callback(null, true);
        }else{

callback('Error: esto no es una imagen');
        }
       
  }


});




/*=============================================================*/
router.post('/enviar', cargar.single('licencia'), crud.enviar);

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

    conexion.query('SELECT * FROM tblformulario_registro', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('./mostrardatos', {
                results: results
            });
        }
    });

});

/*==================RUTA PARA CREAR REGISTRO =====================*/

router.get('/register', (req, res) => {
    res.render('register');
})



module.exports = router;