import ManufacturerController from '../controller/manufacturer.controller'
import { Router } from 'express'

class ManufacturerRoutes {
  router = Router()
  controller = new ManufacturerController()

  constructor() {
    this.intializeRoutes()
  }

  intializeRoutes() {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Manufacturer:
     *       type: object
     *       required:
     *         - id
     *         - name
     *         - url
     *         - address
     *         - headquarterCountryCode
     *         - category
     *         - catalogSize
     *         - reviewState
     *         - aliases
     *       properties:
     *         id:
     *           type: integer
     *         name:
     *           type: string
     *         url:
     *           type: string
     *         address:
     *           type: string
     *         headquarterCountryCode:
     *           type: string
     *         category:
     *           type: string
     *         catalogSize:
     *           type: integer
     *         reviewState:
     *           type: string
     *         aliases:
     *           type: array
     *           items:
     *             $ref: '#/components/schemas/Alias'
     *       example:
     *         id: 1
     *         name: Tech Innovators
     *         url: http://www.techinnovators.com
     *         address: 123 Innovation Road, Silicon Valley, CA
     *         headquarterCountryCode: US
     *         category: electronics
     *         catalogSize: 150
     *         reviewState: todo
     *         aliases:
     *             name: Tech Innovators
     *     Alias:
     *       type: object
     *       required:
     *         - id
     *         - name
     *       properties:
     *         id:
     *           type: integer
     *         name:
     *           type: string
     *       example:
     *         id: 3
     *         name: Tech Innovators
     */

    /**
     * @swagger
     * /manufacturer:
     *   get:
     *     summary: returns all the manufacturers
     *     responses:
     *       200:
     *         description: A list of all manufacturer
     *       400:
     *         description: Valid review state only
     */
    this.router.get('/', this.controller.getManufacturers)
    /**
     * @swagger
     * /manufacturer:
     *   post:
     *     summary: Create a new manufacturer
     *     parameters:
     *       - in: body
     *         name: manufacturer
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *             url:
     *               type: string
     *             address:
     *               type: string
     *             headquarterCountryCode:
     *               type: string
     *             category:
     *               type: string
     *             catalogSize:
     *               type: integer
     *             reviewState:
     *               type: string
     *             aliases:
     *               type: array
     *               item:
     *                 name: string
     *     responses:
     *       201:
     *         description: Manufacturer and aliases created successfully
     *
     */
    this.router.post('/', this.controller.createManufacturer)
    /**
     * @swagger
     * /manufacturer/{id}:
     *   get:
     *     summary: Retrieve a single manufacturer by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Returns the manufacturer with the specified ID
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Manufacturer'
     *       400:
     *         description: Number only
     *       404:
     *         description: Manufacturer not found
     */
    this.router.get('/:id', this.controller.getManufacturer)
    /**
     * @swagger
     * /manufacturer/{id}:
     *   patch:
     *     summary: Update a manufacturer by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       200:
     *         description: Manufacturer and alias updated successfully
     *       400:
     *         description: Number only
     *       404:
     *         description: Manufacturer not found
     */
    this.router.patch('/:id', this.controller.updateManufacturer)
    /**
     * @swagger
     * /manufacturer/{id}:
     *   delete:
     *     summary: Delete a manufacturer by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Manufacturer and alias deleted successfully
     *       400:
     *         description: Number only
     *       404:
     *         description: Manufacturer not found
     */
    this.router.delete('/:id', this.controller.deleteManufacturer)
  }
}

export default new ManufacturerRoutes().router
