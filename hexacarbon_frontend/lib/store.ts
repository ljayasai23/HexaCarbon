import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Address } from "viem"

export interface User {
  address: Address
  role: "uploader" | "admin" | "buyer"
  name: string
  email: string
  organization: string
}

export interface WalletState {
  isConnected: boolean
  address: Address | null
  chainId: number | null
  balance: string | null
}

export interface AppState {
  // User state
  user: User | null
  setUser: (user: User | null) => void

  // Wallet state
  wallet: WalletState
  setWallet: (wallet: Partial<WalletState>) => void

  // UI state
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void

  // Project state
  selectedProject: number | null
  setSelectedProject: (projectId: number | null) => void

  // Loading states
  isLoading: boolean
  setIsLoading: (loading: boolean) => void

  // Error state
  error: string | null
  setError: (error: string | null) => void

  // Clear all state
  clearState: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),

      // Wallet state
      wallet: {
        isConnected: false,
        address: null,
        chainId: null,
        balance: null,
      },
      setWallet: (walletUpdate) =>
        set((state) => ({
          wallet: { ...state.wallet, ...walletUpdate },
        })),

      // UI state
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Project state
      selectedProject: null,
      setSelectedProject: (projectId) => set({ selectedProject: projectId }),

      // Loading states
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),

      // Error state
      error: null,
      setError: (error) => set({ error }),

      // Clear all state
      clearState: () =>
        set({
          user: null,
          wallet: {
            isConnected: false,
            address: null,
            chainId: null,
            balance: null,
          },
          selectedProject: null,
          isLoading: false,
          error: null,
        }),
    }),
    {
      name: "hexacarbon-storage",
      partialize: (state) => ({
        user: state.user,
        wallet: state.wallet,
      }),
    },
  ),
)

// Notification store for real-time updates
interface NotificationState {
  notifications: Array<{
    id: string
    type: "info" | "success" | "warning" | "error"
    title: string
    message: string
    timestamp: number
    read: boolean
  }>
  addNotification: (notification: Omit<NotificationState["notifications"][0], "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
  unreadCount: number
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  addNotification: (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
      read: false,
    }

    set((state) => ({
      notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep only last 50
    }))
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }))
  },

  clearNotifications: () => set({ notifications: [] }),

  get unreadCount() {
    return get().notifications.filter((n) => !n.read).length
  },
}))
