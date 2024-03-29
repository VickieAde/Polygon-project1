// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

require('dotenv').config();
const { ethers } = require("hardhat");

const nftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
const networkAddress = 'https://rpc-mumbai.maticvigil.com';
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(networkAddress);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {

  const nftContract = await ethers.getContractFactory("VickieContract"); 
  const nft = nftContract.attach(nftAddress);
  console.log("You have: " + await nft.balanceOf(wallet.address) + " nfts in your account");   
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode =  1;
});
