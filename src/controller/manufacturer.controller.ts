import { Request, Response } from 'express'

import Manufacturer from '../models/manufacturer.model'
import ManufacturerRepository from '../repositories/manufacturer.repository'
import { snakeToCamel } from '../utils/utils'

export default class ManufacturerController {
  private manufacturerRepository: ManufacturerRepository
  constructor() {
    this.manufacturerRepository = new ManufacturerRepository()

    // Binding methods to current instance to retain 'this' contexte
    this.createManufacturer = this.createManufacturer.bind(this)
    this.getManufacturers = this.getManufacturers.bind(this)
    this.getManufacturer = this.getManufacturer.bind(this)
    this.updateManufacturer = this.updateManufacturer.bind(this)
    this.deleteManufacturer = this.deleteManufacturer.bind(this)
  }

  async createManufacturer(req: Request, res: Response) {
    const manufacturer: Manufacturer = req.body
    try {
      const manufacturerId = await this.manufacturerRepository.create(manufacturer)

      return res.status(201).json(manufacturerId)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error creating manufacturer or aliases')
    }
  }

  /**
   * Return all the manufacturers
   * query parameters: reviewState (optional)
   * @param req Express Request object
   * @param res Express Response object
   */
  async getManufacturers(req: Request, res: Response) {
    const validReviewStates: string[] = ['none', 'todo', 'done']
    const { reviewState } = req.query as { reviewState?: string }
    try {
      // Check the validity of the reviewState
      if (reviewState && !validReviewStates.includes(reviewState)) {
        return res.status(400).send('Valid review state only, please!')
      }

      // Retrieving manufacturers from the repository
      const manufacturers = await this.manufacturerRepository.findAll(reviewState)

      // Response with retrieved manufacturers
      return res.status(200).json(snakeToCamel(manufacturers))
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving manufacturers')
    }
  }

  async getManufacturer(req: Request, res: Response) {
    const id: number = parseInt(req.params.id)
    try {
      if (isNaN(id)) {
        return res.status(400).send('Numbers only, please!')
      }

      const manufacturer = await this.manufacturerRepository.findById(id)

      if (!manufacturer) {
        return res.status(404).send('No manufacturer found')
      }

      return res.status(200).json(snakeToCamel(manufacturer))
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving manufacturer')
    }
  }

  async updateManufacturer(req: Request, res: Response) {
    // Parse the manufacturer ID from the request parameters
    const id: number = parseInt(req.params.id)

    // Get the manufacturer data from the request body
    const manufacturer: Manufacturer = req.body
    try {
      // Check if the ID is a valid number
      if (isNaN(id)) {
        return res.status(400).send('Numbers only, please!')
      }

      // Check if manufacturer data is provided in the request body
      if (!manufacturer) {
        return res.status(404).send('No manufacturer found')
      }

      // Attempt to update the manufacturer in the repository
      await this.manufacturerRepository.update(id, manufacturer)

      return res.status(200).json({ message: 'Manufacturer updated' })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Error updating manufacturer' })
    }
  }

  /**
   * Delete a manufacturer based on the provided ID.
   * @param req Express Request object
   * @param res Express Response object
   */
  async deleteManufacturer(req: Request, res: Response) {
    // Parse the manufacturer ID from the URL parameters.
    const id: number = parseInt(req.params.id)
    const manufacturer: Manufacturer = req.body
    try {
      // Validate the manufacturer ID.
      if (isNaN(id)) {
        return res.status(400).send('Numbers only, please!')
      }

      // Ensure the manufacturer data exists in the request body.
      if (!manufacturer) {
        return res.status(404).send('No manufacturer found')
      }

      // Proceed to delete the manufacturer using the repository.
      await this.manufacturerRepository.delete(id)

      return res.status(200).json({ message: 'Manufacturer deleted' })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Error deleting manufacturer' })
    }
  }
}
