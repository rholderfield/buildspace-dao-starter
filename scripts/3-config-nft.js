import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x1b5068C28A0F1d51a454192D09eC3dfE5f962734",
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