"user strict"

import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import { dbConnection } from "./mongo.js"

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(morgan("dev"))
    //apps.use(limiter)
}

const routes = (app) =>{

}

const conectDB = async() =>{
    try {
        await dbConnection()
        console.log("CONEXIÓN A LA BASE DE DATOS EXITOSA!!!")
    } catch (err) {
        console.log("error al intentar conectar con la DB")
        process.exit(1)
    }
}

export const initServer = async () =>{
    const app = express()
    const Port = process.env.PORT||3000
    
    try {
        middlewares(app)
        conectDB()
        routes(app)
        app.listen(Port)
        console.log(`server init in port ${Port}`)
    } catch (err) {
        console.log(`Server falied intit ${err}`)
        
    }
}