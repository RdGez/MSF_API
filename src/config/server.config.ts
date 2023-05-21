import cors from "cors"
import morgan from "morgan"
import initializeDB from "./db.config"
import express, { Application } from "express"

import AuthRoutes from '../routes/auth.routes'

class Server {
  private port: String
  private app: Application

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '3001'
    if( isNaN(Number( this.port )) ) throw new Error('¡Port need to be a number!')

    initializeDB()
    this.middlewares()
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
  }
}

export default Server