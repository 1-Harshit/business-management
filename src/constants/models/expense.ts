import { Person } from "./person"
import { Site } from "./site"

export interface Expense {
  ID: number
  createdAt: Date
  updatedAt: Date
  date: Date
  subject: string
  mode: string
  amount: number
  remarks: string
  siteID: number
  site: Site
  personID: number
  person: Person
}
