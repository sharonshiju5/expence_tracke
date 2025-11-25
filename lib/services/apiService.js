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
