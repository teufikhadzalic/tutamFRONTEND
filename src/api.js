import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to header Authorization
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// User APIs
export const registerUser = (userData) => API.post("/user/register", userData)
export const loginUser = (credentials) => API.post("/user/login", credentials)
export const getUserByEmail = (email) => API.get(`/user/${email}`)
export const updateUser = (userData) => API.put("/user", userData)
export const deleteUser = (id) => API.delete(`/user/${id}`)

// Workout Program APIs
export const getPrograms = () => API.get("/programs")
export const getProgram = (id) => API.get(`/programs/${id}`)
export const createProgram = (programData) => API.post("/programs", programData)
export const updateProgram = (id, programData) => API.put(`/programs/${id}`, programData)
export const deleteProgram = (id) => API.delete(`/programs/${id}`)

// Exercise APIs
export const addExercise = (programId, exerciseData) => API.post(`/programs/${programId}/exercises`, exerciseData)
export const updateExercise = (programId, exerciseId, exerciseData) =>
  API.put(`/programs/${programId}/exercises/${exerciseId}`, exerciseData)
export const deleteExercise = (programId, exerciseId) => API.delete(`/programs/${programId}/exercises/${exerciseId}`)

export default API
