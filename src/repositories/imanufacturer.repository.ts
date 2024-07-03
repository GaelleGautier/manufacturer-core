import Manufacturer from '../models/manufacturer.model'

export interface IManufacturerRepository {
  create(manufacturer: Manufacturer): Promise<Manufacturer>
  findAll(reviewState?: string): Promise<Manufacturer[]>
  findById(id: number): Promise<Manufacturer | undefined>
  update(id: number, manufacturer: Partial<Manufacturer>): Promise<void>
  delete(id: number): Promise<void>
}
