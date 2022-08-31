import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import hotelRoute from './routes/hotels.js'
import roomRoute from './routes/rooms.js'

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('MongoDB connected successfully❤️ ')
    } catch (error) {
        throw Error
    }
}

const app = express()
dotenv.config()

// middleware

app.use(express.json())

app.use( '/auth', authRoute )
app.use( '/hotels', hotelRoute )
app.use( '/users', userRoute )
app.use( '/rooms', roomRoute )



const PORT = 5000
app.listen( PORT, () => {
    connectDB()
    console.log( `Server started at http://localhost:${ PORT }💚` )
} )


