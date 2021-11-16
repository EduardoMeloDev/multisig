const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the owners", async function () {
    const [sender, receiver, receiver2, receiver3] = await ethers.getSigners();

    const Greeter = await ethers.getContractFactory("MultiSigWallet");
    const greeter = await Greeter.deploy([sender.address,receiver.address,receiver2.address], 2);
    await greeter.deployed();

    const owners = await greeter.getOwners();
    // wait until the transaction is mined
    
    console.log(owners);

  });

  it("Should return the transaction", async function () {
    const [sender, receiver, receiver2, receiver3] = await ethers.getSigners();

    const Greeter = await ethers.getContractFactory("MultiSigWallet");
    const greeter = await Greeter.deploy([sender.address,receiver.address,receiver2.address], 2);
    await greeter.deployed();
    const provider = ethers.provider;

    const _balance = await provider.getBalance(greeter.address);

    await greeter.deposit({from: sender.address , value: ethers.utils.parseEther("1")});

    await greeter.submitTransaction(receiver3.address, ethers.utils.parseEther("1") , 0x00);

    await greeter.confirmTransaction(0);


    const _tx = await greeter.getTransaction(0);

    const _balance1 = await provider.getBalance(greeter.address);

    console.log(_tx.to);
    console.log(ethers.utils.formatUnits(_tx.numConfirmations, 0));
    console.log(ethers.utils.formatUnits(_tx.value, 6));
    console.log(_tx.executed);

  });

});
