import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import cors from 'cors'


const app = express()

app.use(express.json())

/*app.use(cors({
  origin: "https://sven-tenzies.netlify.app",
}
))*/
app.use(cors())

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

