import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const userChats = (id) => API.get(`/chat/${id}`);

export const getUser = (userId) => API.get(`/users/${userId}`);

export const getMessages = (chatId) => API.get(`/message/${chatId}`);

export const addMessage = (data) => API.post(`/message`, data);
