import axiosConfig from "../axios/axiosConfig";

export const adminRegister = async (email: string, password: string) => {
  try {
    const response = await axiosConfig.post("/api/auth/login", {email, password});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const userRegister = async (username: string, mobile: string, email: string, password: string) => {
  try {
    const response = await axiosConfig.post("/api/auth/users", {username, mobile, email, password});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const addIncome = async (date: string, amount: number, itemName: string, customerName: string, customerNumber: string, status: string) => {
  try {
    const response = await axiosConfig.post("/api/transactions", {date, amount, itemName, customerName, customerNumber, status});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getIncome = async (queryParams: string = '') => {
  try {
    const response = await axiosConfig.get(`/api/transactions/${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const updateIncome = async (id: string) => {
  try {
    const response = await axiosConfig.put(`api/transactions/${id}`, {status: "Completed"});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const addexpence = async (expenseDate: string, title: string, description: string, amount: number) => {
  try {
    const response = await axiosConfig.post("/api/expenses", {expenseDate, title, description, amount});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getexpence = async (title: string, username: string) => {
  try {
    const response = await axiosConfig.get(`/api/reports/expense-report?title=${title}&username=${username}`);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getreport = async (page: number = 1, limit: number = 10, search: string = '', date: string = '', customerName: string = '') => {
  try {
    const response = await axiosConfig.get(`/api/reports/transaction-report?page=${page}&limit=${limit}&search=${search}&date=${date}&customerName=${customerName}`);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}