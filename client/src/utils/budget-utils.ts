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
