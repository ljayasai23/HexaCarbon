import { io, type Socket } from "socket.io-client"
import { useNotificationStore } from "./store"
import { useAppStore } from "./appStore" // Declare the useAppStore variable

class WebSocketService {
  private socket: Socket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  connect() {
    if (this.socket?.connected) return

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001"

    this.socket = io(wsUrl, {
      transports: ["websocket"],
      autoConnect: true,
    })

    this.setupEventListeners()
  }

  private setupEventListeners() {
    if (!this.socket) return

    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server")
      this.reconnectAttempts = 0

      useNotificationStore.getState().addNotification({
        type: "success",
        title: "Connected",
        message: "Real-time updates enabled",
      })
    })

    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server")

      useNotificationStore.getState().addNotification({
        type: "warning",
        title: "Disconnected",
        message: "Real-time updates disabled",
      })
    })

    this.socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error)
      this.handleReconnect()
    })

    // Project-related events
    this.socket.on("ProjectCreated", (data) => {
      useNotificationStore.getState().addNotification({
        type: "info",
        title: "New Project Submitted",
        message: `${data.projectName} is awaiting verification`,
      })
    })

    this.socket.on("ProjectVerified", (data) => {
      useNotificationStore.getState().addNotification({
        type: "success",
        title: "Project Verified",
        message: `${data.projectName} has been approved and credits minted`,
      })
    })

    this.socket.on("ProjectRejected", (data) => {
      useNotificationStore.getState().addNotification({
        type: "error",
        title: "Project Rejected",
        message: `${data.projectName} was rejected: ${data.reason}`,
      })
    })

    this.socket.on("CreditsPurchased", (data) => {
      useNotificationStore.getState().addNotification({
        type: "success",
        title: "Credits Purchased",
        message: `${data.amount} credits purchased from ${data.projectName}`,
      })
    })
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect()
      }, 2000 * this.reconnectAttempts)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // Join room for role-specific updates
  joinRoom(room: string) {
    if (this.socket?.connected) {
      this.socket.emit("join", room)
    }
  }

  // Leave room
  leaveRoom(room: string) {
    if (this.socket?.connected) {
      this.socket.emit("leave", room)
    }
  }

  // Send custom event
  emit(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data)
    }
  }
}

export const wsService = new WebSocketService()

// React hook for WebSocket connection
export function useWebSocket() {
  const { user } = useAppStore() // Use the declared useAppStore variable

  const connect = () => {
    wsService.connect()

    // Join role-specific room
    if (user?.role) {
      wsService.joinRoom(user.role)
    }
  }

  const disconnect = () => {
    wsService.disconnect()
  }

  return { connect, disconnect, emit: wsService.emit.bind(wsService) }
}
