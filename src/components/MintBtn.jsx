import React, { useEffect, useState } from "react";
import Button from "./Button";
import rightArrow from "../assets/images/rightArrow.svg";
import { useNavigate } from "react-router-dom";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useContractRead } from "wagmi";
import web3Config from "../web3.config";
import { toast } from "react-toastify";

import { useSetRecoilState } from "recoil";
import { contractMintStageAtom } from "./../recoil/index";

export default function MintBtn({ soldOut }) {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { open, close } = useWeb3Modal();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useContractRead({
    address: web3Config.contractAddress,
    abi: web3Config.abi,
    functionName: "MINT_STAGE",
    watch: true,
  });

  const [ctaIntent, updateCtaIntent] = useState(false);

  const setMintStage = useSetRecoilState(contractMintStageAtom);

  useEffect(() => {
    if (isLoading || !data) return;
    if (ctaIntent && isConnected) {
      setMintStage(data.toString());
      navigate("/tos");
    }
  }, [isConnected, isConnecting, ctaIntent, isLoading, data]);

  return (
    <Button
      onClick={() => {
        if (soldOut) return window.open(web3Config.openSeaLink, "_blank");
        if (isLoading) return;

        if (data.toString() === "0") {
          return toast.error("Mint has not started yet.");
        }

        if (!address || isConnecting || isDisconnected) {
          updateCtaIntent(true);
          open();
        } else {
          setMintStage(data.toString());
          navigate("/tos");
        }
      }}
      id={"mintBtn"}
      variant={"mint"}
    >
      <span>
        <p>{soldOut ? "go to opensea" : "Mint Coupon"}</p>

        <img className="rightArrow" src={rightArrow} alt="arrow" />
      </span>
    </Button>
  );
}
