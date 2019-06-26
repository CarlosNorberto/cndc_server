const accesos=require('../controllers/accesos');

module.exports = (app) => {

    app.get('/accesos', function (req, res) {
        var sql = `SELECT 
                IDACCESO, ANTENNA_NUMBER, ID_READER_RFID, 
                IDDISPOSITIVO, IDPERSONA, FECHA, 
                HORA, IDTIPO, SATISFACTORIO, 
                DESCRIPCION, IDTEMPACCESO, IDTEMPACCESOVEHICULO, 
                IDCAPTURA, FECHA_ELIMINACION, USUARIO_ELIMINACION, 
                FECHA_CREACION, USUARIO_CREACION, FECHA_MODIFICACION, 
                USUARIO_MODIFICACION, IDPROCESADO, IDCORREGIDO, 
                IDHORARIO, EPC, TID
                FROM CAPTURE.ACCESO WHERE IDACCESO=2491`;
        accesos.getAllAccesos(sql, [], res);
    })

}