import Manufacturer, { Alias } from '../models/manufacturer.model'

import { IManufacturerRepository } from './imanufacturer.repository'
import { camelToSnake } from '../utils/utils'
import { connect } from '../db/database'

export default class ManufacturerRepository implements IManufacturerRepository {
  async create(manufacturer: Manufacturer): Promise<Manufacturer> {
    const conn = await connect()
    const { name, url, address, headquarterCountryCode, category, catalogSize, reviewState, aliases } = manufacturer

    const [result]: any = await conn.query('INSERT INTO manufacturer (name, url, address, headquarter_country_code, category, catalog_size, review_state) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, url, address, headquarterCountryCode, category, catalogSize, reviewState])

    const manufacturerId = result.insertId

    if (aliases && aliases.length > 0) {
      const aliasValues = aliases.map((alias: Alias) => [alias, manufacturerId])
      await conn.query('INSERT INTO alias (name, manufacturer_id) VALUES ?', [aliasValues])
    }

    return manufacturerId
  }

  async findAll(reviewState?: string): Promise<Manufacturer[]> {
    // Establish a connection to the database
    const conn = await connect()
    const params: any[] = []

    // Initialize the base query to select all manufacturers
    let queryManufacturers = `SELECT * FROM manufacturer`

    // If a reviewState is provided, modify the query to filter by reviewState
    if (reviewState) {
      queryManufacturers += ` WHERE manufacturer.review_state = ?`
      params.push(reviewState)
    }

    // Execute the query to retrieve manufacturers, passing the reviewState parameter if applicable
    const [manufacturers]: any = await conn.query(queryManufacturers, [reviewState])

    // For each manufacturer, retrieve their associated aliases
    for (const manufacturer of manufacturers) {
      const queryAliases = `SELECT alias.name FROM alias WHERE manufacturer_id = ?`
      const [aliases]: any = await conn.query(queryAliases, [manufacturer.id])
      manufacturer.aliases = aliases // Add aliases to the manufacturer object
    }

    // Return the list of manufacturers, including their aliases
    return manufacturers
  }

  async findById(id: number): Promise<Manufacturer | undefined> {
    const conn = await connect()

    const [manufacturers]: any = await conn.query('SELECT * FROM manufacturer WHERE id = ?', [id])

    if (manufacturers.length === 0) {
      return null
    }

    const manufacturer = manufacturers[0]
    const [aliases]: any = await conn.query('SELECT alias.name FROM alias WHERE manufacturer_id = ?', [id])
    manufacturer.aliases = aliases

    return manufacturer
  }

  async update(id: number, manufacturer: Manufacturer): Promise<void> {
    // Connecting to the database
    const conn = await connect()

    // Extracts the 'aliases' property from the manufacturer object, and collects the remaining properties into 'updateManufacturer'.
    const { aliases, ...updateManufacturer } = camelToSnake(manufacturer) // Converts the manufacturer object properties for database compatibility.

    // Update manufacturer data in the database
    await conn.query('UPDATE manufacturer SET ? WHERE id = ?', [updateManufacturer, id])

    // If there are aliases, update them
    if (aliases) {
      await this.updateAliases(conn, id, aliases)
    }
  }

  async updateAliases(conn: any, manufacturerId: number, aliases: Alias[]) {
    // Deleting old aliases
    await conn.query('DELETE FROM alias WHERE manufacturer_id = ?', [manufacturerId])

    // Adding new alias
    for (const alias of aliases) {
      await conn.query('INSERT INTO alias (name, manufacturer_id) VALUES (?, ?)', [alias.name, manufacturerId])
    }
  }

  async delete(id: number): Promise<void> {
    const conn = await connect()
    await conn.query('DELETE FROM manufacturer WHERE id = ?', [id])
  }
}
