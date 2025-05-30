const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  date: String,
  description: String,
  category: String,
  amount: Number,
});

module.exports = mongoose.model("Expense", ExpenseSchema);