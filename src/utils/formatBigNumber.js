import numeral from "numeral";

export default function formatBigNumber(number) {
  return number < 1000 ? number : numeral(number).format("0.0a");
}
