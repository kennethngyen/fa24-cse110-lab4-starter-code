import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("Expense Creation", () => {
  test("new expense is correctly added", () => {
    render(<App />);

    const createExpenseTitleInput = screen.getByLabelText("Name");
    const createCostInput = screen.getByLabelText("Cost");
    const createExpenseButton = screen.getByText("Save");

    fireEvent.change(createExpenseTitleInput, { target: { value: "Shopping" } });
    fireEvent.change(createCostInput, { target: { value: 100 } });
    fireEvent.click(createExpenseButton);

    const newExpenseTitle = screen.getByTestId("Shopping");
    const newCost = screen.getByTestId("100");

    expect(newExpenseTitle).toBeInTheDocument();
    expect(newCost).toBeInTheDocument();
  });

  test("Verify remaining and total spent update", () => {
    render(<App />);

    const createExpenseTitleInput = screen.getByLabelText("Name");
    const createCostInput = screen.getByLabelText("Cost");
    const createExpenseButton = screen.getByText("Save");

    fireEvent.change(createExpenseTitleInput, { target: { value: "Shopping" } });
    fireEvent.change(createCostInput, { target: { value: 100 } });
    fireEvent.click(createExpenseButton);

    const remaining = screen.getByText("Remaining: $900");
    const spent = screen.getByText("Spent so far: $100");

    expect(remaining).toBeInTheDocument();
    expect(spent).toBeInTheDocument();
  });
});

describe("Expense Deletion", () => {
  test("Expense is removed from the list and totals update", () => {
    render(<App />);

    // Add an expense
    const createExpenseTitleInput = screen.getByLabelText("Name");
    const createCostInput = screen.getByLabelText("Cost");
    const createExpenseButton = screen.getByText("Save");

    fireEvent.change(createExpenseTitleInput, { target: { value: "Shopping" } });
    fireEvent.change(createCostInput, { target: { value: 100 } });
    fireEvent.click(createExpenseButton);

    // Delete the expense
    const deleteExpenseButton = screen.getByTestId("Shopping-delete");
    fireEvent.click(deleteExpenseButton);

    // Verify that the expense is removed
    const deletedExpense = screen.queryByTestId("Shopping");
    expect(deletedExpense).toBeNull(); // Ensure the element is no longer in the DOM

    // Verify the totals are updated correctly
    const remaining = screen.getByText("Remaining: $1000");
    const spent = screen.getByText("Spent so far: $0");

    expect(remaining).toBeInTheDocument();
    expect(spent).toBeInTheDocument();
  });
});

// describe("Budget Balance Verification", () => {
//   test("Budget equals Remaining and Spent", () => {
//     render(<App />);


//     const createExpenseTitleInput = screen.getByLabelText("Name");
//     const createCostInput = screen.getByLabelText("Cost");
//     const createExpenseButton = screen.getByText("Save");

//     fireEvent.change(createExpenseTitleInput, { target: { value: "Shopping" } });
//     fireEvent.change(createCostInput, { target: { value: 100 } });
//     fireEvent.click(createExpenseButton);

//     fireEvent.change(createExpenseTitleInput, { target: { value: "Groceries" } });
//     fireEvent.change(createCostInput, { target: { value: 200 } });
//     fireEvent.click(createExpenseButton);


//     const remaining = screen.getByText(/Remaining:/).textContent;
//     const spent = screen.getByText(/Spent so far:/).textContent;


//     const remainingAmount = parseInt(remaining.match(/\d+/));
//     const spentAmount = parseInt(spent.match(/\d+/));


//     expect(remainingAmount + spentAmount).toBe(1000); 
//   });
// });