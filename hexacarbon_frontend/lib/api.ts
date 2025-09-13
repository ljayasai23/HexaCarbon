import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("auth-token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export interface UploadProjectData {
  projectName: string
  location: string
  coordinates: string
  description: string
  plantingDate: string
  estimatedCredits: number
  communityName: string
  contactPerson: string
  contactEmail: string
  files: File[]
}

export interface UploadResponse {
  success: boolean
  transactionHash: string
  ipfsHash: string
  projectId: number
}

export class ApiService {
  // Project upload endpoint
  static async uploadProject(data: UploadProjectData): Promise<UploadResponse> {
    const formData = new FormData()

    // Add text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "files") {
        formData.append(key, value.toString())
      }
    })

    // Add files
    data.files.forEach((file, index) => {
      formData.append(`file_${index}`, file)
    })

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  }

  // Project verification endpoint
  static async verifyProject(projectId: number, approved: boolean, reason?: string) {
    const response = await api.post("/project/verify", {
      projectId,
      approved,
      reason,
    })

    return response.data
  }

  // Get user projects
  static async getUserProjects(userAddress: string) {
    const response = await api.get(`/projects/user/${userAddress}`)
    return response.data
  }

  // Get all projects for admin
  static async getAllProjects() {
    const response = await api.get("/projects/all")
    return response.data
  }

  // Get pending projects for verification
  static async getPendingProjects() {
    const response = await api.get("/projects/pending")
    return response.data
  }

  // Authentication endpoints
  static async login(email: string, password: string) {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  }

  static async register(userData: {
    name: string
    email: string
    password: string
    role: string
    organization: string
  }) {
    const response = await api.post("/auth/register", userData)
    return response.data
  }

  static async logout() {
    const response = await api.post("/auth/logout")
    localStorage.removeItem("auth-token")
    return response.data
  }
}
