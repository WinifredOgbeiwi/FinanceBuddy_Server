import express from 'express';
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config()

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors())
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(port, ()=>{
    console.log(`listening to port-${port}`)
})


