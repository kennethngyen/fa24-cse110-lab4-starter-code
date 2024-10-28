import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext)


  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    deleteExpense(currentExpense.id);
    setExpenses(expenses.filter(item => item.id !== currentExpense.id));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
  <div data-testid={currentExpense.description}>{currentExpense.description}</div>
  <div data-testid={currentExpense.cost}>${currentExpense.cost}</div>
  <div>
    <button data-testid={currentExpense.description + "-delete"} onClick={() => handleDeleteExpense(currentExpense)}>x</button>
  </div>
</li>

  );
};

export default ExpenseItem;