import { ObjectId } from "mongodb"

import { Entity } from "./entity"

export interface Expense {
  _id: ObjectId
  date: Date
  subject: string
  mode: string
  amount: number
  remarks: string
  site: Entity
  person: Entity
}
