import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ethers } from 'ethers';
import axios from 'axios';
import pinataSDK from '@pinata/sdk';

// --- Configuration ---
const app = express();
const port = 3001;
const uploadsDir = 'uploads';

// --- IMPORTANT: PASTE YOUR KEYS HERE ---
const PINATA_API_KEY = 'YOUR_PINATA_API_KEY';
const PINATA_SECRET_API_KEY = 'YOUR_PINATA_SECRET_API_KEY';
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Optional for now

// Initialize Pinata
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);

// Blockchain Configuration
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // <-- PASTE NEW DEPLOYED ADDRESS HERE

// --- Helper Functions & Setup ---

// Workaround for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Contract ABI from file
const abiFilePath = path.join(__dirname, 'contract-abi.json');
const contractAbiFile = JSON.parse(fs.readFileSync(abiFilePath, 'utf8'));
const contractAbi = contractAbiFile.abi; // Important: Extract the 'abi' array

// Create a contract instance to interact with
const hexaCarbonContract = new ethers.Contract(contractAddress, contractAbi, provider);

/**
 * Uploads a file to IPFS using Pinata.
 * @param {string} filePath - The path to the file to be uploaded.
 * @returns {Promise<string|null>} - A promise that resolves to the IPFS hash (CID) or null on failure.
 */
async function uploadToIPFS(filePath) {
    if (!PINATA_API_KEY || PINATA_API_KEY === 'YOUR_PINATA_API_KEY') {
        console.error("🔴 Pinata API key is missing. Cannot upload to IPFS.");
        return null;
    }
    console.log('🌍 Uploading file to IPFS via Pinata...');
    try {
        const readableStreamForFile = fs.createReadStream(filePath);
        const options = {
            pinataMetadata: {
                name: `HexaCarbon-Proof-${Date.now()}`,
            },
        };
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
        console.log('✅ File uploaded to IPFS successfully! CID:', result.IpfsHash);
        return result.IpfsHash;
    } catch (error) {
        console.error("🔴 Error uploading file to IPFS:", error);
        return null;
    }
}

/**
 * Calls the Gemini API to verify an image.
 * @param {string} imagePath - The path to the image file.
 * @returns {Promise<string>} - Resolves to "VERIFIED" or "REJECTED".
 */
async function verifyImageWithGemini(imagePath) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
        console.log("🔴 Gemini API key is missing. Bypassing AI verification for testing.");
        return "VERIFIED";
    }
    // ... (Gemini API call logic would go here)
    return "VERIFIED"; // Placeholder for actual API call
}


// --- Middleware ---
app.use(cors());
app.use(`/${uploadsDir}`, express.static(path.join(__dirname, uploadsDir)));

// --- Multer Setup for File Uploads ---
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `${uploadsDir}/`),
    filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage: storage });

// --- API Endpoints ---
app.post('/api/upload', upload.single('projectImage'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    console.log(`📸 Image received: ${req.file.path}. Verifying...`);

    // Step 1: Verify the image with AI
    const verificationResult = await verifyImageWithGemini(req.file.path);

    if (verificationResult === 'VERIFIED') {
        console.log('✅ AI verification successful.');
        
        // Step 2: Upload the verified image to IPFS
        const ipfsHash = await uploadToIPFS(req.file.path);

        if (!ipfsHash) {
            return res.status(500).json({
                message: 'Image verified, but failed to upload to IPFS.',
                verification: 'VERIFIED',
            });
        }
        
        // Step 3: If IPFS upload is successful, send transaction to blockchain
        try {
            console.log('🌱 IPFS upload successful. Proceeding to blockchain transaction...');
            const signer = await provider.getSigner(0);
            const contractWithSigner = hexaCarbonContract.connect(signer);
            
            // Get mock data from the request body or use defaults
            const { projectName, projectDescription } = req.body;
            const projectOwner = projectName || "Sundarbans Community Project";
            const gpsCoordinates = projectDescription || "21.9497° N, 89.1833° E";

            console.log(`⛓️ Calling createProject with IPFS Hash: ${ipfsHash}`);
            
            const tx = await contractWithSigner.createProject(
                projectOwner,
                gpsCoordinates,
                ipfsHash // Using the REAL IPFS hash now
            );

            await tx.wait();

            console.log(`🎉 Smart contract transaction sent! Hash: ${tx.hash}`);

            res.status(200).json({
                message: 'Project verified, stored on IPFS, and created on the blockchain!',
                verification: 'VERIFIED',
                ipfsHash: ipfsHash,
                txHash: tx.hash,
            });

        } catch (error) {
            console.error('🔴 Blockchain transaction failed:', error);
            res.status(500).json({
                message: 'Image verified and uploaded, but blockchain transaction failed.',
                verification: 'VERIFIED',
                ipfsHash: ipfsHash,
                error: error.message
            });
        }

    } else {
        res.status(403).json({
            message: 'Project image was rejected by AI verification.',
            verification: 'REJECTED',
        });
    }
});

// --- Server Activation ---
app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});

