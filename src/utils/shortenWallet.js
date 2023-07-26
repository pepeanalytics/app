export function shortenWalletAddress(address) {
  if (address.length <= 8) {
    return address;
  }

  var firstFour = address.substring(0, 4);
  var lastFour = address.substring(address.length - 4);
  var shortForm = firstFour + "..." + lastFour;

  return shortForm;
}
