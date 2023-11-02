import { ethers } from "hardhat";

async function main() {

  const DonateCrypto = await ethers.deployContract("DonateCrypto");

  await DonateCrypto.waitForDeployment();

  console.log(await DonateCrypto.getAddress());
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
