import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Manufacturer API',
      version: '1.0.0',
      description: 'Manufacturer management API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/manufacturer.routes.ts'], // files containing annotations as above
}

export const swaggerDocs = swaggerJSDoc(options)
