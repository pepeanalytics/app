import React from "react";
import { ArrowLeft } from "../assets/Svg";
import Button from "./Button";
import rightArrow from "../assets/images/rightArrow.svg";
import { useNavigate } from "react-router-dom";
import web3Config from "../web3.config";
import { useContractRead, useContractWrite, useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

import { getProof } from "../waitlist";
import { toast } from "react-toastify";

export default function PrivacyPolicy({ contractMintStage }) {
  const navigate = useNavigate();
  const { open, close } = useWeb3Modal();

  const { address } = useAccount();
  const { data: mintPrice, isLoading: isPriceLoading } = useContractRead({
    address: web3Config.contractAddress,
    abi: web3Config.abi,
    functionName: "MINT_PRICE",
  });

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    address: web3Config.contractAddress,
    abi: web3Config.abi,
    chainId: web3Config.chain.id,
    functionName: contractMintStage === "1" ? "mintWhitelist" : "mintPublic",
  });

  const mint = async () => {
    if (!address) return open();
    if (isPriceLoading) return;

    // Check if its the private sale
    if (contractMintStage === "1") {
      let proof = getProof(address);

      if (proof.length === 0) {
        return toast.error("You are not on the whitelist.");
      }

      try {
        await writeAsync({
          args: [proof],
          value: mintPrice,
        });
        navigate("/congrats");
      } catch (e) {
        return toast.error(e.shortMessage);
      }
    } else {
      try {
        let mintTX = await writeAsync({ value: mintPrice });
        console.log(mintTX);
        navigate("/congrats");
      } catch (e) {
        return toast.error(e.shortMessage);
      }
    }
  };

  return (
    <div className="privacyPolicy">
      <div className="privacyPolicy-content">
        <p>Our greetings and welcome to Pepe Analytics,</p>
        <br />
        <p>
          The Interface is a data analytic dashboard for coins on cryptocurrency
          platforms like Ethereum.
        </p>
        <br />
        <p>
          These Terms of Use and any terms and conditions incorporated herein by
          reference (collectively, the “Terms”) govern your access to and use of
          the Interface. You must read the Terms carefully.
        </p>
        <br />
        <p>
          By accessing, browsing or otherwise using the Interface, or by
          acknowledging agreement to the Terms on the Interface, you agree that
          you have read, understood and accepted all of the Terms and our
          Privacy Policy (the “Privacy Policy”), which is incorporated by
          reference into the Terms on the homepage.
        </p>
        <br />
        <p>
          Our Interface is NOT offered to persons or entities who reside in, are
          citizens of, are incorporated in, or have a registered office in the
          United States of America or any Prohibited Localities, namely
          Restricted Persons, as defined below. We do not make exceptions. If
          you are a Restricted Person, then do not attempt to access or use the
          Interface. Use of a virtual private network (e.g., a VPN) or other
          means by Restricted Persons to access or use the Interface is
          prohibited.
        </p>
        <br />
        <p>
          Prohibited Localities. Pepe Analytics does not interact with digital
          wallets located in, established in, or a resident of Myanmar (Burma),
          Cote D'Ivoire (Ivory Coast), Cuba, Crimea and Sevastopol, Democratic
          Republic of Congo, Iran, Iraq, Libya, Mali, Nicaragua, Democratic
          People’s Republic of Korea (North Korea), Somalia, Sudan, Syria,
          Yemen, Zimbabwe or any other state, country or region that is included
          in the Sanction Lists.
        </p>
        <br />
        <p>
          You must not use any software or networking techniques, including use
          of a Virtual Private Network (VPN) to modify your internet protocol
          address or otherwise circumvent or attempt to circumvent this
          prohibition.
        </p>
        <br />
        <p>
          You agree not to access the Interface using any technology for the
          purposes of circumventing these Terms.
        </p>
        <br />
        <p>
          By signing this message, you agree on the terms of services described
          above and on the homepage of{" "}
          <a
            href="https://www.pepeanalytics.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.pepeanalytics.com
          </a>
        </p>
      </div>

      <div className="flex row sb al-ce acceptOrDecline">
        <div className="flex al-ce back">
          <ArrowLeft />
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            Decline and take me back
          </div>
        </div>

        <Button
          disabled={isPriceLoading}
          id="agree"
          variant={"mint"}
          onClick={mint}
        >
          <span>
            agree and proceed
            <img src={rightArrow} alt="arrowRight" />
          </span>
        </Button>
      </div>
    </div>
  );
}
