import React, { useEffect } from "react";
import PrivacyPolicy from "../components/PrivacyPolicy";
import { useRecoilValue } from "recoil";
import { contractMintStageAtom } from "./../recoil/index";
import { useNavigate } from "react-router-dom";

export default function Tos() {
  const contractMintStage = useRecoilValue(contractMintStageAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (contractMintStage === "0") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="headerText">
        Please read and accept the privacy policy before proceeding
      </div>
      <PrivacyPolicy contractMintStage={contractMintStage} />
    </>
  );
}
