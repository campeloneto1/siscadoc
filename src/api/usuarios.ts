import { Usuario, UsuariosResponse } from "@/interfaces/Usuario";
import axiosInstance from "./axios";
import showToast from "@/utils/toast";

const endpoint = "users";

const index = async (page?: string) => {
  try {
    const response = await axiosInstance.get<UsuariosResponse>(
      `${endpoint}${page ? `?page=${page}` : ``}`
    );
    return response.data;
  } catch (error) {
    // Handle error
    showToast(error.message, "error");
  }
};

const show = async (id: number) => {
  try {
    const response = await axiosInstance.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    showToast(error.message, "error");
  }
};

const store = async (data: Usuario) => {
  try {
    const response = await axiosInstance.post(`${endpoint}`, { data });
    return response.data;
  } catch (error) {
    // Handle error
    showToast(error.message, "error");
  }
};

const update = async (id: number, data: Usuario) => {
  try {
    const response = await axiosInstance.patch(`${endpoint}/${id}`, { data });
    return response.data;
  } catch (error) {
    // Handle error
    showToast(error.message, "error");
  }
};

const remove = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    showToast(error.message, "error");
  }
};

export { index, show, store, update, remove };
