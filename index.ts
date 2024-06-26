import express  from "express";
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRutas from './src/routes/userRutas';
import compraRutas from './src/routes/compraRutas';
import producRutas from './src/routes/producRutas'
import webhookRutas from './src/routes/webhookRutas'
import connectDB from "./src/config/database";

connectDB();

dotenv.config();
const app = express();
app.use(express.json());


const port = process.env.port || 3000;

const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3001'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


app.use(bodyParser.json());


//Rutas
app.use('/usuario', userRutas);
app.use('/producto',producRutas);
app.use('/compra',compraRutas);
app.use('',webhookRutas);

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendEvent = (data: any) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const intervalId = setInterval(() => {
        const data = { message: 'Hola, este es un mensaje desde el servidor' };
        sendEvent(data);
    }, 5000); 

    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
});


app.listen(port,()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
});