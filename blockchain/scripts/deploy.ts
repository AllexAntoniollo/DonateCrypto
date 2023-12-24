import { ethers } from "hardhat";

async function main() {
  
  
  const DonateCrypto = await ethers.getContractFactory("DonateCrypto");

  const contract = await DonateCrypto.deploy();
  
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`Contract deployed to: ${contractAddress}`);

  const DonateCryptoAdapter = await ethers.getContractFactory("DonateCryptoAdapter");
  const adapter = await DonateCryptoAdapter.deploy();

  await adapter.waitForDeployment();
  const adapterAddress = await adapter.getAddress();
  console.log(`DonateCryptoAdapter deployed to: ${adapterAddress}`);

  await adapter.upgrade(contractAddress);
  console.log(`DonateCryptoAdapter upgraded to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});