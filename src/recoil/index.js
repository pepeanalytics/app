import { atom } from "recoil";

export const isDrawerOpen = atom({
  key: "isDrawerOpen",
  default: false,
});

export const isMusicModalOpen = atom({
  key: "isMusicModalOpen",
  default: false,
});

export const musicPlayState = atom({
  key: "musicPlayState",
  default: false,
});

export const isTooltipOpenState = atom({
  key: "isTooltipOpenState",
  default: false,
});

export const contractMintStageAtom = atom({
  key: "contractMintStage",
  default: "0",
});
