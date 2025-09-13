import { http, createConfig } from "wagmi"
import { polygon, polygonMumbai } from "wagmi/chains"
import { injected, metaMask, walletConnect } from "wagmi/connectors"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id"

export const config = createConfig({
  chains: [polygon, polygonMumbai],
  connectors: [injected(), metaMask(), walletConnect({ projectId })],
  transports: {
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
