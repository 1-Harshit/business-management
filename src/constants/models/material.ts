import { ObjectId } from "mongodb"

import { Entity } from "./entity"

export interface Material {
  _id: ObjectId
  date: Date
  item: string
  billNo: string
  quantity: number
  materialP: Entity
  transportP: Entity
  site: Entity
  remarks: string
}
