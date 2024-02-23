// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../FXRootContractAbi.js");

require('dotenv').config();
const {nftAddress} = require("../nftData/contractAddress.js");

// Update the FX root contract address if necessary
const fxRootAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Updated FX root contract address

const networkAddress = 'https://ethereum-goerli.publicnode.com';
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(networkAddress);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {

  const nftContract = await ethers.getContractFactory("VickieContract"); 
  const nft = nftContract.attach(nftAddress);
  const fxContract = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  const [signer] = await ethers.getSigners();

  const approveTx = await nft.connect(signer).setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();

  console.log('Approve Successful');

  const nftIds = [6,  7,  8,  9,  10]; 

  for (let i =  0; i < nftIds.length; i++) {
    const depositTx = await fxContract.connect(signer).deposit(
      nft.address,
      wallet.address,
      nftIds[i],
      '0x6566'
    );

    await depositTx.wait();
  }

  console.log("NFTs Funded");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode =  1;
});
