"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { config } from "@/lib/wagmi"
import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { useAccount, useBalance, useChainId } from "wagmi"

const queryClient = new QueryClient()

function WalletSync() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { data: balance } = useBalance({ address })
  const { setWallet } = useAppStore()

  useEffect(() => {
    setWallet({
      isConnected,
      address: address || null,
      chainId: chainId || null,
      balance: balance ? balance.formatted : null,
    })
  }, [address, isConnected, chainId, balance, setWallet])

  return null
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletSync />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
