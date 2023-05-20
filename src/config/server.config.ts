import cors from "cors"
import express, { Application } from "express"
import morgan from "morgan"

class Server {
  private port: String
  private app: Application

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '3001'
    if( isNaN(Number( this.port )) ) throw new Error('¡Port need to be a number!')

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
  }
}

export default Server