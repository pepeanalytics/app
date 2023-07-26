import React from "react";
import Button from "./Button";
import { useRecoilState } from "recoil";
import { musicPlayState } from "../recoil";
import { MusicOn } from "../assets/Svg";
import Tooltip from "./Tooltip";

export default function Footer() {
  const [musicPlay, setMusicPlay] = useRecoilState(musicPlayState);

  return (
    <div className="footer flex row sb al-ce">
      <div className="footer__text">
        Copyright 2023 pepe analytics. all rights reserved.
      </div>
      <Tooltip />
      {musicPlay ? (
        <Button
          data-tooltip-id="tooltip"
          data-tooltip-content="Toggle music"
          onClick={() => {
            setMusicPlay(false);
          }}
          variant="secondary"
        >
          <span className="music-btn">
            <img src={require("../assets/images/musicOff.png")} alt="pepe" />
          </span>
        </Button>
      ) : (
        <Button
          data-tooltip-id="tooltip"
          data-tooltip-content="Toggle music"
          variant="secondary"
          onClick={() => {
            setMusicPlay(true);
          }}
        >
          <span className="music-btn">
            <MusicOn />
          </span>
        </Button>
      )}
    </div>
  );
}
