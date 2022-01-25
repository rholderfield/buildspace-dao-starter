import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract.
const voteModule = sdk.getVoteModule(
  "0xB2F506c5F8246Af927D0D0b55ffd2081c570971A",
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x23F2DC0CAd81d7391d1CafD8531FE1a258Ca5982",
);

(async () => {
  try {
    const amount = 2_000;
    // Create proposal to mint 420,000 new token to the treasury.
    await voteModule.propose(
      "Should we grant " + amount + " SEEDS to the artist for our discord stickers?",
      [
        {
          // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
          // to send in this proposal. In this case, we're sending 0 ETH.
          // We're just minting new tokens to the treasury. So, set to 0.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a mint! And, we're minting to the voteModule, which is
            // acting as our treasury.
            "mint",
            [
              voteModule.address,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),
          // Our token module that actually executes the mint.
          toAddress: tokenModule.address,
        },
      ]
    );

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }
})();