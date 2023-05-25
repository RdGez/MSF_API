import cors from "cors"
import morgan from "morgan"
import initializeDB from "./db.config"
import express, { Application } from "express"

import { AuthRoutes, TrackRoutes } from "../routes"
import { seedDB } from "../utils/seed.helper"

class Server {
  private port: String
  private app: Application

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '3001'
    if( isNaN(Number( this.port )) ) throw new Error('¡Port need to be a number!')

    this.init()
    this.middlewares()
  }

  async init() {
    initializeDB()
    // await seedDB()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Running At: http://localhost:${process.env.PORT} 🚀`)
    })
  }
  
  routes() {
    // Here we will add global routes for our app.
    this.app.use('/api/auth', AuthRoutes);
    this.app.use('/api/track', TrackRoutes);
  }
}

export default Server