const http=require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const accesos=require('./controllers/accesos');
const server=http.createServer(app);

const io=require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hola!!');
});

require('./routes/routes')(app);

server.listen(port, () => {
    console.log("Servidor en escucha...");
});

const cron = require('node-cron');
cron.schedule('*/1 * * * * *', () => {
    getCronAccesos();
}, {
        scheduled: true,
        timezone: 'America/La_Paz'
    });

// SELECT 
// IDACCESO, ANTENNA_NUMBER, ID_READER_RFID, 
// IDDISPOSITIVO, IDPERSONA, FECHA, 
// HORA, IDTIPO, SATISFACTORIO, 
// DESCRIPCION, IDTEMPACCESO, IDTEMPACCESOVEHICULO, 
// IDCAPTURA, FECHA_ELIMINACION, USUARIO_ELIMINACION, 
// FECHA_CREACION, USUARIO_CREACION, FECHA_MODIFICACION, 
// USUARIO_MODIFICACION, IDPROCESADO, IDCORREGIDO, 
// IDHORARIO, EPC, TID
// FROM CAPTURE.ACCESO WHERE IDACCESO=2491

async function getCronAccesos(){
    var result = await accesos.getAccesosCron(`SELECT v.* FROM CAPTURE.VACCESOS v`);

    io.emit('get-accesos', result);

    console.log(result);
    console.log('Runing a job at 01:00 at America/Sao_Paulo timezone');
}