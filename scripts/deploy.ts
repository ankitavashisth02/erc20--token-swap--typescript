import hre from "hardhat";

async function main() {
  const [owner] = await hre.ethers.getSigners(); // owner is not being used anywhere

  const ERC20 = await  hre.ethers.getContractFactory("ERC20");
  const ERC20_A = await  hre.ethers.getContractFactory("ERC20");

  const contract1 = await ERC20.deploy();
  const contract2 = await ERC20_A.deploy();

  await contract1.waitForDeployment();
  console.log("address of contract1 :",await contract1.getAddress());

  await contract2.waitForDeployment();
  console.log("address of contract2 :",await contract2.getAddress());


  const CPAMM = await hre.ethers.getContractFactory("CPAMM");
  const contract3 = await CPAMM.deploy(await contract1.getAddress(), await contract2.getAddress());

  await contract3.waitForDeployment();
  console.log("Address of contract3 :",await contract3.getAddress());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Remove useless comments

// 0x00A47703F42D64e71ee8166a117121656FD0437B
// 0xe3118826315d8E5d676ffA08470d789b81D35dc8
// 0x5f0Fc7D3ad8a121Dc65e1664f9aEe3d504590225