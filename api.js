import express from 'express'
import dotenv from 'dotenv'
import tweetRoutes from './routers/tweets.routes.js'
import userRoutes from './routers/user.routes.js'

// Env Varaibles
dotenv.config()
const { PORT } = process.env

// Config
const app = express()
app.use(express.json())

// Routes
app.use('/', userRoutes)
app.use('/tweets', tweetRoutes)


app.listen(PORT)



