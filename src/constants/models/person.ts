import { ObjectId } from "mongodb"

export interface Person {
  _id: ObjectId
  name: string
  contact: string
  address: string
  comments: string
  isActive: boolean
}
