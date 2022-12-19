import { ObjectId } from "mongodb"

import { Expense, Material, Person, Site } from "src/constants/models"

const parseSite = (site: Site) => {
  let ret = site
  ret._id = new ObjectId(site._id)
  ret.isActive = Boolean(site.isActive)
  ret.agreementDate = new Date(site.agreementDate)
  ret.completionDate = new Date(site.completionDate)
  ret.boqCost = Number(site.boqCost)
  ret.estimatedCost = Number(site.estimatedCost)
  ret.agreementValue = Number(site.agreementValue)
  return ret
}

const parsePerson = (person: Person) => {
  let ret = person
  ret._id = new ObjectId(person._id)
  ret.isActive = Boolean(person.isActive)
  return ret
}

const parseExpense = (expense: Expense) => {
  let ret = expense
  ret._id = new ObjectId(expense._id)
  ret.date = new Date(expense.date)
  ret.amount = Number(expense.amount)
  if (expense.site?._id)
    ret.site = {
      _id: new ObjectId(expense.site?._id),
      name: expense.site?.name,
    }
  if (expense.person?._id)
    ret.person = {
      _id: new ObjectId(expense.person?._id),
      name: expense.person?.name,
    }
  return ret
}

const parseMaterial = (material: Material) => {
  let ret = material
  ret._id = new ObjectId(material._id)
  ret.date = new Date(material.date)
  ret.quantity = Number(material.quantity)
  if (material.site?._id)
    ret.site = {
      _id: new ObjectId(material.site?._id),
      name: material.site?.name,
    }
  if (material.materialP?._id)
    ret.materialP = {
      _id: new ObjectId(material.materialP?._id),
      name: material.materialP?.name,
      rate: Number(material.materialP?.rate),
    }
  if (material.transportP?._id)
    ret.transportP = {
      _id: new ObjectId(material.transportP?._id),
      name: material.transportP?.name,
      rate: Number(material.transportP?.rate),
    }
  return ret
}

const parse = (model: object, type: string) => {
  if (type === "site") {
    return parseSite(model as Site)
  }
  if (type === "person") {
    return parsePerson(model as Person)
  }
  if (type === "expense") {
    return parseExpense(model as Expense)
  }
  if (type === "material") {
    return parseMaterial(model as Material)
  }
  return null
}
export default parse
