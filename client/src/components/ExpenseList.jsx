import React from "react";

function ExpenseList({ expenses, onDelete, onEdit }) {
  return (
    <table className="table table-bordered">
      <thead className="table-light">
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id}>
            <td>{expense.date}</td>
            <td>{expense.description}</td>
            <td>{expense.category}</td>
            <td>₹{expense.amount}</td>
            <td>
                
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(expense)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(expense._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;