import axiosConfig from "../axios/axiosConfig";
//  ===========-=-=-=-=-==-=-=- ADMIN LOGIN =-=-=-=-=-=-=--============-=-=-=
export const adminLogin = async (email: string, password: string) => {
  try {
    const response = await axiosConfig.post("/api/auth/login", {email, password});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const ForgotPassword = async (email: string,) => {
  try {
    const response = await axiosConfig.post("/api/auth/forgot-password", {email});
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const adminreport = async (search: string, status: string = '', page: number = 1, limit: number = 10) => {
  try {
    const query = `?customerName=${search}&page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`;
    const response = await axiosConfig.get(`/api/transactions/admin${query}`);
    console.log("admin report??????????????????");
    
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getusers = async (search: string = '') => {
  try {
    const response = await axiosConfig.get(`/api/auth/users?usernam=${search}`);
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

export const userUpdate = async (username: string, mobile: string, email: string, password: string, _id: string) => {
  try {
    const response = await axiosConfig.put(`/api/auth/users/${_id}`, {username, mobile, email, password});
    return response.data;
  } catch (error) {
    console.error("Error during user update:", error);
    throw error;
  }
};

export const userDelete = async (_id: string) => {
  try {
    const response = await axiosConfig.delete(`/api/auth/users/${_id}`);
    return response.data;
  } catch (error) {
    console.error("Error during user deletion:", error);
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

export const getDashBoard = async () => {
  try {
    const response = await axiosConfig.get(`/api/reports/my-report`);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getRecentTransactions = async () => {
  try {
    const response = await axiosConfig.get(`/api/reports/staff/recent-transactions`);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getDashBoardAdmin = async () => {
  try {
    const response = await axiosConfig.get(`/api/reports/admin/monthly`);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getGraph = async () => {
  try {
    const response = await axiosConfig.get(`/api/reports/daily`);
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
    const response = await axiosConfig.put(`/api/transactions/${id}`, {status: "Completed"});
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

export const getreport = async (page: number = 1, limit: number = 10, search: string = '', date: string = '', customerName: string = '', status: string = '') => {
  try {
    const response = await axiosConfig.get(`/api/user/reports/transaction-report?page=${page}&limit=${limit}&search=${search}&date=${date}&customerName=${customerName}${status ? `&status=${status}` : ''}`);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}