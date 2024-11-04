import { API_BASE_URL } from "../constants/constants";

export const fetchBudget = async (): Promise<number> => {
    try {
        const response = await fetch(`${API_BASE_URL}/budget`);
        if (!response.ok) {
            throw new Error('Failed to fetch budget');
        }

        const jsonResponse = await response.json();
        console.log("Data in fetchBudget:", jsonResponse);
        
        return jsonResponse.data;
    } catch (error) {
        console.error("Error in fetchBudget:", error);
        return 0; 
    }
};

export const updateBudget = async (budget: number): Promise<number> => {
  const response = await fetch(`${API_BASE_URL}/budget`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: budget }),
  });

  if (!response.ok) {
      throw new Error("Error in updateBudget");
  }

  const data = await response.json();
  return data.budget;
};