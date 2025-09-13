import { readContract, writeContract, waitForTransactionReceipt } from "@wagmi/core"
import { config } from "./wagmi"
import { HEXACARBON_ABI, HEXACARBON_CONTRACT_ADDRESS } from "./contracts"
import { type Address, parseEther } from "viem"

export interface Project {
  id: number
  submitter: Address
  ipfsHash: string
  location: string
  estimatedCredits: number
  mintedCredits: number
  availableCredits: number
  isVerified: boolean
  timestamp: number
}

export class BlockchainService {
  static async submitProject(
    submitter: Address,
    ipfsHash: string,
    location: string,
    estimatedCredits: number,
  ): Promise<string> {
    try {
      const hash = await writeContract(config, {
        address: HEXACARBON_CONTRACT_ADDRESS,
        abi: HEXACARBON_ABI,
        functionName: "submitProject",
        args: [submitter, ipfsHash, location, BigInt(estimatedCredits)],
      })

      // Wait for transaction confirmation
      await waitForTransactionReceipt(config, { hash })

      return hash
    } catch (error) {
      console.error("Error submitting project:", error)
      throw new Error("Failed to submit project to blockchain")
    }
  }

  static async verifyAndMintCredits(projectId: number, creditsToMint: number): Promise<string> {
    try {
      const hash = await writeContract(config, {
        address: HEXACARBON_CONTRACT_ADDRESS,
        abi: HEXACARBON_ABI,
        functionName: "verifyAndMintCredits",
        args: [BigInt(projectId), BigInt(creditsToMint)],
      })

      await waitForTransactionReceipt(config, { hash })

      return hash
    } catch (error) {
      console.error("Error verifying project:", error)
      throw new Error("Failed to verify project on blockchain")
    }
  }

  static async purchaseCredits(projectId: number, amount: number, pricePerCredit: number): Promise<string> {
    try {
      const totalCost = parseEther((amount * pricePerCredit).toString())

      const hash = await writeContract(config, {
        address: HEXACARBON_CONTRACT_ADDRESS,
        abi: HEXACARBON_ABI,
        functionName: "purchaseCredits",
        args: [BigInt(projectId), BigInt(amount)],
        value: totalCost,
      })

      await waitForTransactionReceipt(config, { hash })

      return hash
    } catch (error) {
      console.error("Error purchasing credits:", error)
      throw new Error("Failed to purchase credits")
    }
  }

  static async getProject(projectId: number): Promise<Project> {
    try {
      const result = await readContract(config, {
        address: HEXACARBON_CONTRACT_ADDRESS,
        abi: HEXACARBON_ABI,
        functionName: "getProject",
        args: [BigInt(projectId)],
      })

      return {
        id: projectId,
        submitter: result[0],
        ipfsHash: result[1],
        location: result[2],
        estimatedCredits: Number(result[3]),
        mintedCredits: Number(result[4]),
        availableCredits: Number(result[5]),
        isVerified: result[6],
        timestamp: Number(result[7]),
      }
    } catch (error) {
      console.error("Error fetching project:", error)
      throw new Error("Failed to fetch project from blockchain")
    }
  }

  static async getUserCredits(userAddress: Address): Promise<number> {
    try {
      const result = await readContract(config, {
        address: HEXACARBON_CONTRACT_ADDRESS,
        abi: HEXACARBON_ABI,
        functionName: "getUserCredits",
        args: [userAddress],
      })

      return Number(result)
    } catch (error) {
      console.error("Error fetching user credits:", error)
      throw new Error("Failed to fetch user credits")
    }
  }

  static async getProjectCount(): Promise<number> {
    try {
      const result = await readContract(config, {
        address: HEXACARBON_CONTRACT_ADDRESS,
        abi: HEXACARBON_ABI,
        functionName: "getProjectCount",
      })

      return Number(result)
    } catch (error) {
      console.error("Error fetching project count:", error)
      throw new Error("Failed to fetch project count")
    }
  }

  static async getAllVerifiedProjects(): Promise<Project[]> {
    try {
      const projectCount = await this.getProjectCount()
      const projects: Project[] = []

      for (let i = 1; i <= projectCount; i++) {
        try {
          const project = await this.getProject(i)
          if (project.isVerified) {
            projects.push(project)
          }
        } catch (error) {
          console.warn(`Failed to fetch project ${i}:`, error)
        }
      }

      return projects
    } catch (error) {
      console.error("Error fetching verified projects:", error)
      throw new Error("Failed to fetch verified projects")
    }
  }
}
