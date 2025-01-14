import axios from 'axios';

const API_BASE = 'https://server-n42x.onrender.com';

export const login = (credentials: { username: string; password: string }) =>
  axios.post(`${API_BASE}/api/auth/login`, credentials);

export const fetchUsers = (token: string) =>
  axios.get(`${API_BASE}/api/users`, {
    headers: { Authorization: ` ${token}` },
  });

export const createUser = (user: any, token: string) =>
  axios.post(`${API_BASE}/api/users`, user, {
    headers: { Authorization: ` ${token}` },
  });

export const updateUser = (id: string, user: any, token: string) =>
  axios.put(`${API_BASE}/api/users/${id}`, user, {
    headers: { Authorization: `${token}` },
  });

export const deleteUser = (id: string, token: string) =>
  axios.delete(`${API_BASE}/api/users/${id}`, {
    headers: { Authorization: `${token}` },
  });
