"user strict"

import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import { hash } from "argon2"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/authRoutes.js"
import userRoutes from "../src/user/userRoutes.js"
import categoryRoutes from "../src/category/categoryRoutes.js"
import User from "../src/user/user.model.js"
import Category from "../src/category/categoryModel.js"

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(morgan("dev"))
    //apps.use(limiter)
}

const routes = (app) =>{
    app.use("/VirtualStore/v1/auth", authRoutes)
    app.use("/VirtualStore/v1/users", userRoutes)
    app.use("/VirtualStore/v1/category", categoryRoutes)
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

export const defaultAdmin = async() =>{
    try {
        const Adminemail = "admin@gmail.com"
        const password = "admin123"

        const existAdmin = await User.findOne({email: Adminemail})

        if(!existAdmin){
            const passwordEncrypt = await hash(password)

            const adminUser = new User({
                name: "Admin",
                username: "administrador",
                email: Adminemail,
                password: passwordEncrypt,
                role: "ADMIN"
            })
            await adminUser.save()
            console.log("Administrador por defecto ha sido creado exitosamente!!!")
        }
        if(existAdmin){
            console.log("Ya se ha generado el Administrador")
        }

    } catch (er) {
        console.error("Error al crear el Administrador ", er)
    }
}

export const defaultCat = async () => {
    try {
        const categName = "Uncategorized";
        const categExist = await Category.findOne({ nameCategory: categName }); 

        if (!categExist) {
            const categ = new Category({
                nameCategory: categName, 
            });
            await categ.save();
            console.log("Categoría por defecto ha sido creada con éxito!!!!");
        } else {
            console.log("Ya existe la categoría por defecto");
        }
    } catch (error) {
        console.error("Error al crear la categoría por defecto:", error);
    }
};


export default {
    defaultAdmin,
    defaultCat
}