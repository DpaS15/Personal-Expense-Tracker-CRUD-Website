import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./index.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    try {
      await axios.post("http://localhost:5000/api/expenses", expense);
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
  console.log("PUT to backend with ID:", id, "Data:", updatedExpense); // ✅ Debug log
  try {
    await axios.put(`http://localhost:5000/api/expenses/${id}`, updatedExpense);
    setEditingExpense(null);
    fetchExpenses(); 
  } catch (error) {
    console.error("Error updating expense:", error);
  }
};

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Personal Expense Tracker</h2>
      <ExpenseForm
        onAdd={addExpense}
        onUpdate={updateExpense}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />
      <ExpenseList
        expenses={expenses}
        onDelete={deleteExpense}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;