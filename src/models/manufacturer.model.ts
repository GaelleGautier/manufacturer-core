export default interface Manufacturer {
  id: number
  name: string
  url: string
  address: string
  headquarterCountryCode: string
  category: string
  catalogSize: number
  reviewState: string
  aliases: Alias[]
}

export interface Alias {
  id: number
  name: string
}
