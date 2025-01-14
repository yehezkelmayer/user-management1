import axios from 'axios';

const API_BASE = 'https://server-n42x.onrender.com';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2JkNmYyN2VhMzdhMjE4NjAxOTMzZCIsImlhdCI6MTczNjc3MTQzMSwiZXhwIjoxNzM2Nzc1MDMxfQ.-KmKDnN8h8eqKvOLI8pXsOjjxAk1YeK8ZVWGGE9oZt8';

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
