import express from "express"
import cors from "cors"
import 'dotenv/config'

const app= express();
app.use(express.json())
app.use(cors('*'))

const PORT= process.env.PORT
app.listen(PORT, ()=>console.log(`backend is running on ${PORT}`))