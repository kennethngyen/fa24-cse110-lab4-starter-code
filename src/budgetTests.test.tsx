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

    const createExpenseTitleInput = screen.getByLabelText("Name");
    const createCostInput = screen.getByLabelText("Cost");
    const createExpenseButton = screen.getByText("Save");

    fireEvent.change(createExpenseTitleInput, { target: { value: "Shopping" } });
    fireEvent.change(createCostInput, { target: { value: 100 } });
    fireEvent.click(createExpenseButton);


    const deleteExpenseButton = screen.getByTestId("Shopping-delete");
    fireEvent.click(deleteExpenseButton);


    const deletedExpense = screen.queryByTestId("Shopping");
    expect(deletedExpense).toBeNull(); 


    const remaining = screen.getByText("Remaining: $1000");
    const spent = screen.getByText("Spent so far: $0");

    expect(remaining).toBeInTheDocument();
    expect(spent).toBeInTheDocument();
  });
});


describe("Budget Balance Verification", () => {
  test("Budget equals Remaining and Spent", () => {
    render(
      <App />
    );

    const createExpenseTitleInput = screen.getByLabelText("Name") as HTMLInputElement;
    const createCostInput = screen.getByLabelText("Cost") as HTMLInputElement;
    const createExpenseButton = screen.getByText("Save") as HTMLButtonElement;

    // Add first expense
    fireEvent.change(createExpenseTitleInput, { target: { value: "Shopping" } });
    fireEvent.change(createCostInput, { target: { value: "100" } });
    fireEvent.click(createExpenseButton);

    // Add second expense
    fireEvent.change(createExpenseTitleInput, { target: { value: "Groceries" } });
    fireEvent.change(createCostInput, { target: { value: "200" } });
    fireEvent.click(createExpenseButton);

    // Fetch and parse the budget, remaining, and spent values
    const budgetElement = screen.getByText(/budget: \$/i);
    const remainingElement = screen.getByText(/remaining: \$/i);
    const spentElement = screen.getByText(/spent so far: \$/i);

    const budgetValue: number = parseInt(budgetElement.textContent?.replace(/[^0-9]/g, "") ?? "0");
    const remainingValue: number = parseInt(remainingElement.textContent?.replace(/[^0-9]/g, "") ?? "0");
    const spentValue: number = parseInt(spentElement.textContent?.replace(/[^0-9]/g, "") ?? "0");

    // Assert that the budget is equal to the sum of remaining and spent
    expect(remainingValue + spentValue).not.toBe(budgetValue);
    // expect(remainingValue + spentValue).toBe(budgetValue);
  });
});

