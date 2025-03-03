"use strict"

import { config } from "dotenv"
import { initServer, defaultAdmin, defaultCat } from "./config/server.js"


config()
initServer()
defaultAdmin()
defaultCat()