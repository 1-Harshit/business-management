/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { ObjectId } from "mongodb"

import { Expense } from "src/constants/models"

import { expenseCollection } from "./connect"

const addExpense = async (expense: Expense) => {
  expense.createdAt = new Date()
  expense.updatedAt = new Date()

  const collection = await expenseCollection()
  const result = collection.insertOne(expense)

  return result
}

const getExpenses = async () => {
  const collection = await expenseCollection()
  const result = await collection.find({}).sort({ date: -1 }).toArray()

  return result as Expense[]
}

const getExpense = async (id: string) => {
  const o_id = new ObjectId(id)
  const collection = await expenseCollection()
  const result = await collection.findOne({ _id: o_id })

  return result as Expense
}

const updateExpense = async (expense: Expense) => {
  if (!expense._id) throw new Error("No expense id provided")
  expense.updatedAt = new Date()

  const collection = await expenseCollection()
  const result = await collection.updateOne(
    { _id: expense._id },
    { $set: expense }
  )

  return result
}

const deleteExpense = async (id: string) => {
  const o_id = new ObjectId(id)
  const collection = await expenseCollection()
  const result = await collection.deleteOne({
    _id: o_id,
  })

  return result
}

export { addExpense, getExpenses, getExpense, updateExpense, deleteExpense }