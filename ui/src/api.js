import axios from "axios";

const API = "http://localhost:4000";

export const getConfig = () => axios.get(`${API}/config`);
export const saveConfig = (config) => axios.post(`${API}/config`, config);
