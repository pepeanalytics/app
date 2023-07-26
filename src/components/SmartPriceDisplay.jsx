export default function SmartPriceDisplay({ price }) {
  if (price === "N/A") return <>-</>;

  // The case where the price is not too small
  let mustReduce = price.substring(0, 10) === "0.00000000";
  if (!mustReduce) {
    return <>{price.substring(0, 8)}</>;
  }

  // The case where the price needs to be reduced
  let zeroCount = 0;
  let i = 0;
  let endingFour = "";

  for (let mStr = price.substring(3); i < mStr.length; i++) {
    if (mStr[i] === "0") {
      zeroCount++;
    } else {
      endingFour = mStr.substring(i, i + 4);
      break;
    }
  }

  return (
    <>
      0.0<sub>{zeroCount}</sub>
      {endingFour}
    </>
  );
}
