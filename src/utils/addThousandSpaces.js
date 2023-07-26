export default function addThousandSpaces(number) {
  // Convert the number to a string
  let numberString = number.toString();

  // Split the string into an array of characters
  let characters = numberString.split("");

  // Reverse the array of characters for easier processing
  characters.reverse();

  // Insert a space after every third character
  for (let i = 3; i < characters.length; i += 4) {
    characters.splice(i, 0, " ");
  }

  // Reverse the characters back and join them into a string
  let result = characters.reverse().join("");

  return result;
}
