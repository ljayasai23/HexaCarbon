import type { Address } from "viem"

// HexaCarbon Smart Contract ABI (simplified for demo)
export const HEXACARBON_ABI = [
  {
    inputs: [
      { name: "_submitter", type: "address" },
      { name: "_ipfsHash", type: "string" },
      { name: "_location", type: "string" },
      { name: "_estimatedCredits", type: "uint256" },
    ],
    name: "submitProject",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "_projectId", type: "uint256" },
      { name: "_creditsToMint", type: "uint256" },
    ],
    name: "verifyAndMintCredits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "_projectId", type: "uint256" },
      { name: "_amount", type: "uint256" },
    ],
    name: "purchaseCredits",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "_projectId", type: "uint256" }],
    name: "getProject",
    outputs: [
      { name: "submitter", type: "address" },
      { name: "ipfsHash", type: "string" },
      { name: "location", type: "string" },
      { name: "estimatedCredits", type: "uint256" },
      { name: "mintedCredits", type: "uint256" },
      { name: "availableCredits", type: "uint256" },
      { name: "isVerified", type: "bool" },
      { name: "timestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "_owner", type: "address" }],
    name: "getUserCredits",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProjectCount",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const

// Contract addresses (would be different for mainnet/testnet)
export const CONTRACT_ADDRESSES = {
  [137]: "0x1234567890123456789012345678901234567890" as Address, // Polygon Mainnet
  [80001]: "0x0987654321098765432109876543210987654321" as Address, // Polygon Mumbai Testnet
} as const

export const HEXACARBON_CONTRACT_ADDRESS = CONTRACT_ADDRESSES[137] // Default to mainnet
