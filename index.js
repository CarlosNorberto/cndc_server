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
    res.send('CNDC Server');
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

async function getCronAccesos(){
    try {
        var result = await accesos.getAccesosCron(`SELECT v.* FROM OCACCESS.VACCESOS v`);
        io.emit('get-accesos', result);
    } catch (error) {
        console.log(error);
    }

}