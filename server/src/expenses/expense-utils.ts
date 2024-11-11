import { Request, Response } from "express";
import { Database } from "sqlite";

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

export async function getExpenses(req: Request, res: Response, db: Database){
    try{
        const expenses = await db.all('SELECT * FROM expenses;');
        res.status(200).send({data: expenses});
    } catch (error){
        res.status(500).send({error: `Failed to get all expenses, + ${error}`});
    }
 }

export async function deleteExpense(req: Request, res:Response, db: Database){
    const{id} = req.params;
    if(!id){
        return res.status(400).send({error: 'No ID found!'});
    }

    try{
        const result = await db.run('DELETE FROM expenses WHERE id = ?;', [id]);
        if (result.changes === 0){
            return res.status(400).send({error: 'Failed to create expenses'});
        }
        res.status(200).send({message: 'Expense successfully got deleted!'});
    } catch (error){
        return res.status(500).send({error: `Failed to delete expense: ${error}`});
    }
}
// export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
//     const { id } = req.params;

//     const index = expenses.findIndex(expense => expense.id === id);

//     if (index === -1) {
//         return res.status(404).send({ error: "Expense not found" });
//     }
//     console.log(id)
//     expenses.splice(index, 1);
//     console.log("deleted", expenses);
//     res.status(200).send({"newExpense":expenses});
// }

// export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
//     res.status(200).send({ "data": expenses });
// }