const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("TestContract");
    const greeter = await Greeter.deploy();
    await greeter.deployed();

    
    const transaction = await greeter.getData();

    console.log(transaction);


  });
});
