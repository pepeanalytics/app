const fs = require("fs");

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const addresses = [
  "0x0000000000000000000000000000000000000002",
  "0x1A4622b92865EE37Fedd56f6F3C5f9B397F251C6",
  "0x8F02865702ce8ee70B1F1c8a95E23E551FF54378",
  "0xc12e715b5ad636e42e28d35db5653239ace0c66b",
];

const leafNodes = addresses.map((a) => keccak256(a));

fs.writeFileSync("leafNodes.json", JSON.stringify(leafNodes, null, 2), {
  encoding: "utf8",
});
