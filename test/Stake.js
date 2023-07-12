const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Stake", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  it("check delegate call", async function () {
    console.log("Running test")
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    console.log("owner address:", otherAccount.address)



    const stake = await ethers.deployContract("Stake");
    await stake.waitForDeployment();
    //console.log("Stake deployed to:", stake.target);
    console.log("staker after deployment:", await stake.getStaker())
    const delegateCall = await ethers.deployContract("DelegateCallTest", [stake.target]);
    await delegateCall.waitForDeployment();
    //console.log("DelegateCall deployed to:", delegateCall.target);

    let tx = await stake.connect(otherAccount).stake();
    await tx.wait();

    console.log("staker after calling stake", await stake.getStaker())



    tx = await stake.connect(otherAccount).stake();
    await tx.wait();
    tx = await delegateCall.connect(otherAccount).callStakeContract();
    await tx.wait();
    await time.increase(1000);
    console.log("staker after delegaate call", await stake.getStaker())


  })

});
