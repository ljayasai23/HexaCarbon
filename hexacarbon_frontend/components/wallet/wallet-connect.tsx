"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { useConnect, useDisconnect, useAccount } from "wagmi"
import { useAppStore } from "@/lib/store"

export function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false)
  const { connectors, connect, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { isConnected, address } = useAccount()
  const { wallet } = useAppStore()

  const handleConnect = (connector: any) => {
    connect({ connector })
    setIsOpen(false)
  }

  const handleDisconnect = () => {
    disconnect()
    setIsOpen(false)
  }

  if (isConnected && address) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="hidden sm:inline">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wallet Connected</DialogTitle>
            <DialogDescription>Your wallet is successfully connected to HexaCarbon</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Address:</span>
                <code className="text-sm">{address}</code>
              </div>
              {wallet.balance && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Balance:</span>
                  <span className="text-sm">{Number.parseFloat(wallet.balance).toFixed(4)} MATIC</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Network:</span>
                <span className="text-sm">
                  {wallet.chainId === 137 ? "Polygon" : wallet.chainId === 80001 ? "Mumbai Testnet" : "Unknown"}
                </span>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Your wallet is connected and ready for blockchain transactions.</AlertDescription>
            </Alert>

            <Button onClick={handleDisconnect} variant="destructive" className="w-full">
              Disconnect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to HexaCarbon and start trading carbon credits
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                onClick={() => handleConnect(connector)}
                disabled={isPending}
                variant="outline"
                className="w-full justify-start"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Wallet className="mr-2 h-4 w-4" />
                {connector.name}
              </Button>
            ))}
          </div>

          <Alert>
            <AlertDescription>
              Make sure you're connected to the Polygon network for the best experience.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  )
}
