import { AppContext } from "../../context/AppContext";
import React, { useState, useContext } from "react";
const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState<number | string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newExpense = {
      id: crypto.randomUUID().toString(),
      name: name,
      cost: parseFloat(cost.toString()),
    };

    setExpenses([...expenses, newExpense]);
    setName("");
    setCost("");

  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
