const conexion = require('../database/cn');

exports.enviar = async (req, res) => {
    const nombres = req.body.nombres
    const apellidos = req.body.apellidosform
    const fecha_nacimiento = req.body.fechaform
    const numero_telefono = req.body.telefonoform
    const correo = req.body.correo
    const seguro_social = req.body.seguro
     const ciudad_donde_vive = req.body.ciudad
    const direccion = req.body.direccion
    const apt_suite_unidad = req.body.direccion2
    const codigo_postal = req.body.postal
    const numero_referido = req.body.referido
    const nombre_banco = req.body.banco
    const numero_de_cuenta = req.body.cuenta
    const numero_de_ruta = req.body.ruta
    const nombre_beneficiario = req.body.beneficiario
    // const frontal = '/imglicencias/sigmaWater_' + req.body.licencia
    // const trasera = '/imglicencias/sigmaWater_' + req.body.licencia_trasera
    // const licencia_conduccion = JSON.stringify({'frontal':frontal,'trasera':trasera});
    console.log("FRONTAL:>>>  ", req.nomArchivo[0]);
    console.log("TRASERA:>>>  ", req.nomArchivo[1]);
    const frontal = '/imglicencias/sigmaWater_' + req.nomArchivo[0]
    const trasera = '/imglicencias/sigmaWater_' + req.nomArchivo[1]
    const licencia_conduccion = JSON.stringify({'frontal':frontal,'trasera':trasera});
  
    const nuevoRegistro = {
        nombres,
        apellidos,
        fecha_nacimiento,
        numero_telefono,
        correo,
        seguro_social,
        ciudad_donde_vive,
        direccion,
        apt_suite_unidad,
        codigo_postal,
        numero_referido,
        nombre_banco,
        numero_de_cuenta,
        numero_de_ruta,
        nombre_beneficiario,
        licencia_conduccion,
    }

   console.log("Licencia Front-Back >>> ", licencia_conduccion);
    await conexion.query('INSERT INTO tblformulario_registro SET ?', [nuevoRegistro],

        (error, resultados) => {
            if (error) {
                res.json(error)
                console.log(error);
            } else {
                // req.flash = ("success", "Tu registro ha sido recibido Muchas gracias!");
                res.redirect('/mensaje');
            }
        }
    );
}