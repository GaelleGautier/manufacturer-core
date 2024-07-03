import * as bodyParser from 'body-parser'

import ManufacturerRoutes from './routes/manufacturer.routes'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { swaggerDocs } from '../swagger'
import swaggerUi from 'swagger-ui-express'

dotenv.config()

// Create an instance of the Express
export const app = express()

// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Configuration to accepts requests from the Angular application
app.use(
  cors({
    origin: 'http://localhost:4200',
  }),
)

// Define the port to listen on
const PORT = process.env.PORT || 3000
app.use(express.json())

// Associate swagger UI with the application
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Use the ManufacturerRoutes for any routes starting with /manufacturer
app.use('/manufacturer', ManufacturerRoutes)

// Start the server - export for testing purposes
export const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
