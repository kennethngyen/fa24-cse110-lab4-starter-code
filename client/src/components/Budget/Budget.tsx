import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);

  useEffect(() => {
    const loadBudget = async () => {
      try {
        const fetchedBudget = await fetchBudget();
        setBudget(fetchedBudget); 
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };

    loadBudget();
  }, [setBudget]);

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${budget}</div>
    </div>
  );
};

export default Budget;
