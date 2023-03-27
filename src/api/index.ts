import axios from 'axios'
export const baseURL = 'http://192.168.31.158:8091/'
export const api = axios.create({
  baseURL,
  timeout: 5000
})

