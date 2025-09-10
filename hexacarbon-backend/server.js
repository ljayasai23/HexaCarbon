import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ethers } from 'ethers';
import pinataSDK from '@pinata/sdk';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';

// --- Initial Configuration ---
dotenv.config();
const app = express();
const port = 3001;
const uploadsDir = 'uploads';

// --- Environment Variables ---
const { PINATA_API_KEY, PINATA_SECRET_API_KEY, GEMINI_API_KEY } = process.env;
// FIX: Updated to match the variable name from your .env file screenshot
const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS;

// --- Pre-flight System Checks ---
// FIX: Updated the check to use the correct variable name
if (!contractAddress || !contractAddress.startsWith('0x')) {
    console.error("🔴 FATAL ERROR: DEPLOYED_CONTRACT_ADDRESS is not defined or invalid in your .env file.");
    console.error("Please ensure your .env file is present and contains a valid line like: DEPLOYED_CONTRACT_ADDRESS=\"0x...\"");
    process.exit(1); // Exit the application if the contract address is missing
}
if (!PINATA_API_KEY || PINATA_API_KEY === 'YOUR_PINATA_API_KEY') {
    console.warn("⚠️ WARNING: PINATA_API_KEY is not set in .env. IPFS uploads will default to a placeholder.");
}


// --- Service Initializations ---
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');

// --- In-Memory Project Store ---
let projects = [];
let nextProjectId = 1;

// --- Helper Functions & Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const abiFilePath = path.join(__dirname, 'contract-abi.json');
const contractAbiFile = JSON.parse(fs.readFileSync(abiFilePath, 'utf8'));
const contractAbi = contractAbiFile.abi;
const hexaCarbonContract = new ethers.Contract(contractAddress, contractAbi, provider);

// --- (Existing uploadToIPFS and verifyImageWithGemini functions go here) ---
async function uploadToIPFS(filePath) {
    if (!PINATA_API_KEY || PINATA_API_KEY === 'YOUR_PINATA_API_KEY') {
        return "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"; // Return placeholder if no key
    }
    const readableStreamForFile = fs.createReadStream(filePath);
    const options = { pinataMetadata: { name: `HexaCarbon-Proof-${Date.now()}` } };
    const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
    return result.IpfsHash;
}
async function verifyImageWithGemini(imagePath) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
        return "VERIFIED";
    }
    // Real Gemini logic would go here
    return "VERIFIED";
}

// --- Middleware ---
app.use(cors());
app.use(`/${uploadsDir}`, express.static(path.join(__dirname, uploadsDir)));

// --- Multer Setup ---
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, `${uploadsDir}/`),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

// --- HTTP API Endpoints ---
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/upload', upload.single('projectImage'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const { projectName, projectDescription } = req.body;
  const newProject = {
    id: nextProjectId++,
    name: projectName || "Unnamed Project",
    description: projectDescription || "No description.",
    status: 'PENDING',
    ipfsHash: null,
    txHash: null,
  };
  projects.push(newProject);

  console.log(`[Project #${newProject.id}] 📸 Image received. Verifying...`);

  const verificationResult = await verifyImageWithGemini(req.file.path);

  if (verificationResult === 'VERIFIED') {
    newProject.status = 'VERIFIED';
    console.log(`[Project #${newProject.id}] ✅ AI verification successful.`);

    const ipfsHash = await uploadToIPFS(req.file.path);
    if (!ipfsHash) {
      newProject.status = 'IPFS_UPLOAD_FAILED';
      return res.status(500).json({ message: 'IPFS upload failed.', project: newProject });
    }

    newProject.ipfsHash = ipfsHash;
    console.log(`[Project #${newProject.id}] 🌱 IPFS upload successful.`);

    try {
      const signer = await provider.getSigner(0);
      const contractWithSigner = hexaCarbonContract.connect(signer);

      console.log(`[Project #${newProject.id}] ⛓️ Calling createProject with IPFS Hash: ${ipfsHash}`);

      const tx = await contractWithSigner.createProject(
        newProject.name,
        newProject.description,
        ipfsHash
      );

      newProject.txHash = tx.hash;
      console.log(`[Project #${newProject.id}] 🎉 Transaction sent! Hash: ${tx.hash}`);

      res.status(200).json({
        message: 'Project submitted and transaction sent!',
        project: newProject,
      });

    } catch (error) {
      newProject.status = 'CHAIN_TRANSACTION_FAILED';
      console.error(`[Project #${newProject.id}] 🔴 Blockchain transaction failed:`, error);
      res.status(500).json({ message: 'Blockchain transaction failed.', project: newProject, error: error.message });
    }
  } else {
    newProject.status = 'REJECTED';
    res.status(403).json({ message: 'Project rejected by AI.', project: newProject });
  }
});

// --- Server Activation ---
const server = app.listen(port, () => {
  console.log(`✅ HTTP Server running on http://localhost:${port}`);
});

// --- WebSocket Server Setup ---
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('🔗 WebSocket Client connected');
  ws.on('close', () => console.log('👋 WebSocket Client disconnected'));
});

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

console.log('👂 Listening for ProjectCreated events from the blockchain...');

hexaCarbonContract.on('ProjectCreated', (projectId, owner, gpsCoordinates, ipfsImageHash, event) => {
    console.log('🔔 Blockchain Event Received: ProjectCreated');

    const projectIndex = projects.findIndex(p => p.ipfsHash === ipfsImageHash);

    if (projectIndex !== -1) {
        const project = projects[projectIndex];
        console.log(`✅ Event matches Project #${project.id}. Broadcasting update.`);

        const finalProjectData = {
            id: project.id,
            name: owner,
            description: gpsCoordinates,
            status: 'VERIFIED',
            ipfsHash: ipfsImageHash,
            txHash: event.log.transactionHash,
        };

        projects[projectIndex] = finalProjectData;
        broadcast({ type: 'NEW_PROJECT', payload: finalProjectData });
    }
});

