import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import cors from 'cors';


const app = express()

app.use(express.json())

app.use(cors())

/* for better server protection
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}
))*/

app.use('/users', userRoute)

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error);
  });

