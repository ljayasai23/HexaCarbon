import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * This is a Hardhat Ignition module.
 *
 * It defines how the 'HexaCarbon' contract should be deployed.
 * For more information, see the Ignition documentation: https://hardhat.org/ignition/docs/getting-started
 */
const HexaCarbonModule = buildModule("HexaCarbonModule", (m) => {
  // The 'contract' function deploys a new instance of a contract.
  // The first argument is the contract name.
  // The second argument is an array of constructor arguments.
  // Since our HexaCarbon constructor takes no arguments, we provide an empty array [].
  const hexaCarbon = m.contract("HexaCarbon", []);

  // The module returns an object with the deployed contract instance.
  return { hexaCarbon };
});

export default HexaCarbonModule;

