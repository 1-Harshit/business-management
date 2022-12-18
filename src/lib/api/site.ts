/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { Site } from "src/constants/models"

import { siteCollection } from "./connect"

const addSite = async (site: Site) => {
  site.CreatedAt = new Date()
  site.UpdatedAt = new Date()

  const collection = await siteCollection()
  const result = collection.insertOne(site)

  return result
}

const getSites = async () => {
  const collection = await siteCollection()
  const result = await collection
    .find({})
    .sort({ isActive: -1, completionDate: -1 })
    .toArray()

  return result as Site[]
}

const updateSite = async (site: Site) => {
  if (!site._id) throw new Error("No site id provided")
  site.UpdatedAt = new Date()

  const collection = await siteCollection()
  const result = await collection.updateOne({ _id: site._id }, { $set: site })

  return result
}

export { addSite, getSites, updateSite }
