import { Person } from "./person"
import { Site } from "./site"

export interface Material {
  ID: number
  createdAt: Date
  updatedAt: Date
  date: Date
  name: string
  billNo: string
  quantity: number
  materialRate: number
  transportRate: number
  materialPersonID: number
  materialPerson: Person
  transportPersonID: number
  transportPerson: Person
  siteID: number
  site: Site
  remarks: string
}
