import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import compression from "compression"
import helmet from "helmet"
import RateLimit from "express-rate-limit"

const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
  });


const app = express()



app.use(express.json())

/*app.use(cors({
  origin: "https://sven-tenzies.netlify.app",
}
))*/

app.use(limiter)

app.use(cors())

app.use(compression())
app.use(helmet());

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

