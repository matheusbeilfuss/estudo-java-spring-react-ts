import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export const fetchNames = async () => {
  const response = await api.get("/nomes");
  return response.data;
};

export const deleteName = async (id: number) => {
  await api.delete(`/nomes/${id}`);
};

export default api;
