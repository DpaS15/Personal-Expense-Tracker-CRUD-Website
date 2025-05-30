import React, { useState, useEffect } from "react";

function ExpenseForm({ onAdd, onUpdate, editingExpense, setEditingExpense }) {
  const [form, setForm] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        date: editingExpense.date,
        description: editingExpense.description,
        category: editingExpense.category,
        amount: editingExpense.amount.toString(),
      });
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      ...form,
      amount: parseFloat(form.amount),
    };

    if (editingExpense) {
      onUpdate(editingExpense._id, expenseData);
      setEditingExpense(null); // Reset form to "Add" mode
    } else {
      onAdd(expenseData);
    }

    setForm({ date: "", description: "", category: "", amount: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <div className="col">
          <select
            className="form-select"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Category</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Others</option>
          </select>
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
        </div>
        <div className="col">
          <button className="btn btn-primary w-100">
            {editingExpense ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ExpenseForm;