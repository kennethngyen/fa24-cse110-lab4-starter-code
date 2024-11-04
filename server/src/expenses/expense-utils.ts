import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body;
 
    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }
 
    try {
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
    res.status(201).send({ id, description, cost });
} 

export async function deleteExpense(req: Request, res: Response, db: Database) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: "Needs ID in request" });
    }

    try {
        const result = await db.run('DELETE FROM expenses WHERE id = ?;', [id]);

        if (result.changes === 0) {
            return res.status(400).send({ error: 'Expense failed create' });
        }

        res.status(200).send({ message: "Expense deleted successfully" });
    } catch (error) {
        return res.status(500).send({ error: `Could not delete expense: ${error}` });
    }
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        const expenses = await db.all('SELECT * FROM expenses;');
        res.status(200).send({ data: expenses });
    } catch (error) {
        res.status(500).send({ error: `Failed to get all expenses with error: ${error}` });
    }
}
