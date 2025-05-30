const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// Add one or many expenses
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      // Insert multiple expenses
      const result = await Expense.insertMany(data);
      res.status(201).json({ message: "Multiple expenses added", data: result });
    } else {
      // Insert single expense
      const newExpense = new Expense(data);
      const saved = await newExpense.save();
      res.status(201).json(saved);
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to add expense(s)", details: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
});

// Delete expense by ID
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;