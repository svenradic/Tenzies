import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import https from 'https';
import fs from 'fs';


const app = express()

app.use(express.json())

/*app.use(cors({
  origin: "https://sven-tenzies.netlify.app",
}
))*/
app.use(cors())

app.use('/users', userRoute)

/*const httpsOptions = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
};*/

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error);
  });

