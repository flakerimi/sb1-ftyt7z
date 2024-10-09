import axios from 'axios'
import baseConfig from '@core/base'

const api = axios.create({
  baseURL: baseConfig.apiBaseUrl,
})

export function useApi() {
  const get = async (url: string, params = {}) => {
    try {
      const response = await api.get(url, { params })
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  const post = async (url: string, data = {}) => {
    try {
      const response = await api.post(url, data)
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Add more methods as needed (put, delete, etc.)

  return {
    get,
    post,
  }
}