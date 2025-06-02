import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface CriteriaMark {
  name: string;
  value: number;
}

export const getNBACriteriaMarks = async (): Promise<CriteriaMark[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/nba/criteria-marks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching NBA criteria marks:', error);
    return [];
  }
}; 