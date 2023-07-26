import { SWAP_LINKS } from "../consts";

export default function createTradeLink(baseToken, quoteToken, protocol) {
  switch (protocol.toLowerCase()) {
    case "sushiswap":
      return `${SWAP_LINKS["sushiswap"]}?inputCurrency=${baseToken}&outputCurrency=${quoteToken}`;
    case "uniswap":
      return `${SWAP_LINKS["uniswap"]}?inputCurrency=${baseToken}&outputCurrency=${quoteToken}`;
    default:
      return `N/A`;
  }
}
