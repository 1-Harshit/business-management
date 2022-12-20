/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { ObjectId } from "mongodb"

import { Material } from "src/constants/models"

import { materialCollection } from "./connect"

const addMaterial = async (material: Material) => {
  material.createdAt = new Date()
  material.updatedAt = new Date()

  const collection = await materialCollection()
  const result = collection.insertOne(material)

  return result
}

const updateMaterial = async (material: Material) => {
  if (!material._id) throw new Error("No material id provided")
  material.updatedAt = new Date()

  const collection = await materialCollection()
  const result = await collection.updateOne(
    { _id: material._id },
    { $set: material }
  )

  return result
}

const deleteMaterial = async (id: string) => {
  const o_id = new ObjectId(id)
  const collection = await materialCollection()
  const result = await collection.deleteOne({
    _id: o_id,
  })

  return result
}

const getMaterial = async (id: string) => {
  const o_id = new ObjectId(id)
  const collection = await materialCollection()
  const result = await collection.findOne({ _id: o_id })

  return result as Material
}
const getDailyMaterials = async (date: Date) => {
  const queryDate = new Date(date)

  const collection = await materialCollection()
  const result = await collection
    .find({
      date: {
        $gte: new Date(queryDate),
        $lt: new Date(queryDate.setDate(date.getDate() + 1)),
      },
    })
    .toArray()

  return result as Material[]
}

export {
  addMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterial,
  getDailyMaterials,
}
