import { formatUnits } from "ethers";
import numeral from "numeral";

export default function getDisplayAmount(rawBalance, decimals) {
  if (isNaN(rawBalance) || isNaN(decimals)) {
    return "Pool Position";
  }
  if (rawBalance.indexOf(".") !== -1) {
    return (Number(rawBalance) / Math.pow(10, Number(decimals))).toFixed(
      Number(decimals)
    );
  }
  let tokenAmount = formatUnits(rawBalance, parseInt(decimals));

  if (tokenAmount.split(".")[0].length > 4) {
    tokenAmount = numeral(tokenAmount).format("0.00a");
  }

  return tokenAmount;
}
