"use strict"

import { config } from "dotenv"
import { initServer, defaultAdmin } from "./config/server.js"


config()
defaultAdmin()
initServer()