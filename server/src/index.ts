import { Response } from "express";
import { createBudgetEndpoints } from "./budget/budget-endpoints";
import { createExpenseEndpoints } from "./expenses/expense-endpoints";
import { budget } from "./constants";
import initDB from "./createTable";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});

//  immediately-invoked asynchronous function. By wrapping code inside this async function, we can perform asynchronous tasks, like connecting to the database, right when the server starts
(async () => {
 const db = await initDB();

 // Root endpoint to get test if the server is running
 app.get("/", (res: Response) => {
   res.send({ "data": "Hello, TypeScript Express!" });
   res.status(200);
 });

 createExpenseEndpoints(app, db); //db passed in reference everywhere to re-use later

 createBudgetEndpoints(app, budget);
})();