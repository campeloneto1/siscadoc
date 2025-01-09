import axiosInstance from "./axios";
import showToast from "@/utils/toast";

const check = async () => {
  try {
    const response = await axiosInstance.get("/check");
    return response.data;
  } catch (error) {
    // Handle error
    showToast("Erro ao verificar usuário", "error");
  }
};

const login = async (cpf: string, password: string): any => {
  try {
    const response = await axiosInstance.post("/login", {
      cpf: cpf,
      password: password,
    });
    return response.data;
  } catch (error) {
    // Handle error
    showToast("Erro ao realizar o login", "error");
  }
};

const logout = async (): any => {
  try {
    const response = await axiosInstance.get("/logout");
    sessionStorage.clear();
    return response.data;
  } catch (error) {
    showToast("Erro ao realizar o logout", "error");
  }
};

const user = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    // Handle error
    showToast("Erro ao retornar usuário", "error");
  }
};

export { check, logout, login, user };
