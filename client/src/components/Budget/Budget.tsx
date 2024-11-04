import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
  const [newBudget, setNewBudget] = useState(budget); // Track the new budget value

  useEffect(() => {
    const loadBudget = async () => {
      try {
        const fetchedBudget = await fetchBudget();
        setBudget(fetchedBudget); 
        setNewBudget(fetchedBudget); // Sync initial value for editing
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };

    loadBudget();
  }, [setBudget]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedBudget = await updateBudget(newBudget);
      setBudget(updatedBudget);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewBudget(budget); // Reset to the original budget on cancel
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <div>
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
            className="form-control d-inline w-auto mr-2"
          />
          <button onClick={handleSaveClick} className="btn btn-primary btn-sm">Save</button>
          <button onClick={handleCancelClick} className="btn btn-secondary btn-sm ml-2">Cancel</button>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <span>Budget: ${budget}</span>
          <button onClick={handleEditClick} className="btn btn-link btn-sm ml-2">Edit</button>
        </div>
      )}
    </div>
  );
};

export default Budget;
