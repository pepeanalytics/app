import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";

import leafNodes from "./leafNodes";

const toBufferLeafNodes = leafNodes.map((leafNode) =>
  Buffer.from(leafNode, "hex")
);

const merkleTree = new MerkleTree(toBufferLeafNodes, keccak256, {
  sortPairs: true,
});
const root = merkleTree.getRoot();

console.info("Merkle Root: " + root.toString("hex"));

export function getProof(address) {
  const leaf = keccak256(address);
  return merkleTree.getHexProof(leaf);
}
