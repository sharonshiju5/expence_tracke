import axiosConfig from "../axios/axiosConfig";

export const adminRegister = async (email,password)=> {
  try {
    const response = await axiosConfig.post("/api/auth/login", {email,password,});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const userRegister = async (username,mobile,email,password)=> {
  try {
    const response = await axiosConfig.post("/api/auth/users", {username,mobile,email,password,});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const addIncome = async (date,amount,itemName,customerName,customerNumber,status)=> {
  try {
    const response = await axiosConfig.post("/api/transactions", {date,amount,itemName,customerName,customerNumber,status});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getIncome = async (status)=> {
  try {
    const response = await axiosConfig.get(`/api/transactions/?status=${status}`);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const updateIncome = async (id)=> {
  try {
    const response = await axiosConfig.get(`api/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const addexpence = async (expenseDate,title,description,amount)=> {
  try {
    const response = await axiosConfig.post("/api/expenses", {expenseDate,title,description,amount,});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getexpence = async (title, username)=> {
  try {
    const response = await axiosConfig.get(`/api/reports/expense-report?title=${title}&username=${username}`);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};