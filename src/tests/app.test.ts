import { app, server } from '../server'

import Manufacturer from '../models/manufacturer.model'
import ManufacturerRepository from '../repositories/manufacturer.repository'
import dotenv from 'dotenv'
import request from 'supertest'

//Loading environment variables with dotenv for access to the database sucessfully
dotenv.config()

/**
 * Testing a asynchronous function in the manufacuter.repository
 *
 * This test suite verifies the behavior of the `findById` function
 * in the ManufacturerRepository. It checks two scenarios:
 *
 * 1. When no manufacturer is found for the given ID, the function should return null.
 * 2. When a manufacturer is found for the given ID, the function should return the manufacturer
 *    with the correct name.
 *
 * Before running the tests, it creates an instance of ManufacturerRepository.
 */
/* describe('Testing repository file with findById function', () => {
  let manufacturerRepository: ManufacturerRepository

  beforeAll(() => {
    manufacturerRepository = new ManufacturerRepository()
  })

  test('should return null if no manufacturer found', async () => {
    const result = await manufacturerRepository.findById(0)
    expect(result).toBeNull()
    console.log('Input value: 0, expected value: null and output value: ' + result)
  })

  test('should return a name manufacturer if found', async () => {
    const result = await manufacturerRepository.findById(1)
    expect(result.name).toBe('Tech Innovators')
    console.log('Input value: 1, expected value: Tech Innovators and output value: ' + result.name)
  })
}) */

describe('Testing repository file with update function', () => {
  let manufacturerRepository: ManufacturerRepository
  let manufacturer: Manufacturer = {
    id: 1,
    name: 'Test',
    url: 'www.test.com',
    address: 'test',
    headquarterCountryCode: 'US',
    category: 'test',
    catalogSize: 300,
    reviewState: 'todo',
    aliases: [
      {
        id: 1,
        name: 'ALias 1',
      },
      {
        id: 2,
        name: 'Alias 2',
      },
    ],
  }

  beforeAll(() => {
    manufacturerRepository = new ManufacturerRepository()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return true if a manufacturer found', async () => {
    // Simulez que la fonction 'update' de votre connexion renvoie 'null'
    const mockUpdate = jest.fn().mockReturnValue(true)
    manufacturerRepository.update = mockUpdate

    const result = await manufacturerRepository.update(1, manufacturer)
    expect(result).toBe(true)
    expect(mockUpdate).toHaveBeenCalledWith(1, manufacturer)
    
  })

  /* test('should return a name manufacturer if found', async () => {
    const result = await manufacturerRepository.findById(1)
    expect(result.name).toBe('Tech Innovators')
    console.log('Input value: 1, expected value: Tech Innovators and output value: ' + result.name)
  }) */
})

/**
 * Testing the API
 *
 * This test suite verifies that the GET /manufacturer endpoint
 * responds correctly when accessed. It uses Supertest to simulate
 * HTTP requests to the Express application.
 *
 * The test checks the following:
 * 1. The response status should be 200 (OK).
 * 2. The response body should not be null.
 * 3. Logs the response body for inspection.
 *
 * In case of an error, the test logs the error and checks that
 * no error should have occurred.
 */

/* describe('GET /manufacturer', () => {
  it('It should response the GET method', async () => {
    await request(app)
      .get('/manufacturer')
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body).not.toBeNull()
        console.log('root: ' + JSON.stringify(response.body))
      })
      .catch((error) => {
        console.log('root error: ' + error)
        expect(error).toBeNull()
      })
  })
}) */

// Shutting down the server after running all tests
afterAll((done) => {
  server.close(done)
})
