import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x34cCA412c845498Dfd63EEDe9357c3783e824b93",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "A Happy Seedling",
        description: "This NFT will give you access to PlantATree DAO!",
        image: readFileSync("scripts/assets/seedling.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()