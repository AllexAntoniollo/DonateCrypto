import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";

import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/d1592647a2e64705ae78c8a097ee18ae`,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    localganache:{
      url: process.env.PROVIDER_URL,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    hardhat:{
      chainId: 1337,
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY
  },

}


export default config;