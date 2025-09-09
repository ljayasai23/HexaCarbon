// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

/**
 * @title HexaCarbon
 * @dev A smart contract to create immutable records of blue carbon projects
 * and mint unique NFTs representing their carbon credits.
 * This version includes events for real-time tracking.
 */
contract HexaCarbon is ERC721 {
    // --- State Variables ---

    // A counter to ensure each project and NFT has a unique ID.
    uint256 private _nextTokenId;

    // Struct to hold the details of a mangrove plantation project.
    struct Project {
        uint256 id;
        string projectOwner; // e.g., "Sundarbans Community NGO"
        string gpsCoordinates; // e.g., "14.123, 80.456"
        string ipfsImageHash; // The unique hash of the verification image on IPFS
        uint256 timestamp; // The time the project was recorded on the blockchain
        address minter; // The address that initiated the creation
    }

    // Mapping from the project/token ID to the Project struct.
    mapping(uint256 => Project) public projects;

    // --- Event ---

    /**
     * @dev Emitted when a new project is successfully created and verified.
     * This allows UIs to listen for new projects in real-time.
     * `indexed` parameters can be filtered by listeners.
     */
    event ProjectCreated(
        uint256 indexed projectId,
        string projectOwner,
        string gpsCoordinates,
        string ipfsImageHash,
        address minter,
        uint256 timestamp
    );


    // --- Constructor ---

    constructor() ERC721("HexaCarbon Credit", "HCC") {
        console.log("HexaCarbon Smart Contract Deployed!");
    }


    // --- Public Functions ---

    /**
     * @dev Creates a new project record and mints an associated NFT.
     * This function should only be callable by a trusted backend server.
     * @param projectOwner The name of the organization that planted the mangroves.
     * @param gpsCoordinates The GPS data for the plantation site.
     * @param ipfsImageHash The IPFS hash (CID) of the verified proof-of-work image.
     */
    function createProject(
        string memory projectOwner,
        string memory gpsCoordinates,
        string memory ipfsImageHash
    ) public {
        // Use the current value of the counter as the new ID.
        uint256 newItemId = _nextTokenId;

        // Mint a new NFT and assign it to the contract creator (or a treasury address).
        // In a real system, this could be the NGO's wallet.
        _safeMint(msg.sender, newItemId);

        // Create and store the new Project struct.
        projects[newItemId] = Project({
            id: newItemId,
            projectOwner: projectOwner,
            gpsCoordinates: gpsCoordinates,
            ipfsImageHash: ipfsImageHash,
            timestamp: block.timestamp,
            minter: msg.sender
        });

        console.log("New project created with ID:", newItemId);
        console.log("IPFS Hash stored:", ipfsImageHash);

        // Emit the event to notify the world about this new project.
        emit ProjectCreated(
            newItemId,
            projectOwner,
            gpsCoordinates,
            ipfsImageHash,
            msg.sender,
            block.timestamp
        );

        // Increment the counter for the next project.
        _nextTokenId++;
    }
}

