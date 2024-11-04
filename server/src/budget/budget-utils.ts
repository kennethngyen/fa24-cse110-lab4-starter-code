import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    const newAmount = body?.amount;

    // Check if newAmount is valid
    const isInvalid = newAmount === undefined || typeof newAmount !== 'number' || newAmount < 0;
    if (isInvalid) {
        res.status(400).json({ error: "Invalid budget amount" });
        return;
    }

    // Update and send the new budget amount
    budget.amount = newAmount;
    res.status(200).json({ data: budget.amount });
}
