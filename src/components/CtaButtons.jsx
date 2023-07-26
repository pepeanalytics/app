import React from "react";
import Button from "./Button";
import discord from "../assets/images/discord.svg";
import twitter from "../assets/images/twitter.svg";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { shortenWalletAddress } from "../utils/shortenWallet";

export default function CtaButtons() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open, close } = useWeb3Modal();

  const handleConnectWallet = () => {
    open();
  };

  return (
    <div className="flex row cta-buttons">
      <Button onClick={handleConnectWallet} id="connectBtn" variant="primary">
        <span>
          {address && !isConnecting && !isDisconnected
            ? shortenWalletAddress(address)
            : "Connect Wallet"}
        </span>
      </Button>

      <SocailButtons />
    </div>
  );
}

export const SocailButtons = () => {
  const handleTwitter = () => {
    window.open("https://twitter.com/pepeanalyticsai", "_blank");
  };
  const handleDiscord = () => {
    window.open("https://discord.com/invite/pepeanalytics ", "_blank");
  };

  return (
    <div className="flex row">
      <Button onClick={handleTwitter} variant="secondary">
        <span className="cta-buttons__social-icon">
          <img src={twitter} alt="twitter" />
        </span>
      </Button>

      <Button onClick={handleDiscord} variant="secondary">
        <span className="cta-buttons__social-icon">
          <img src={discord} alt="discord" />
        </span>
      </Button>
    </div>
  );
};
