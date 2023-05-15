import { create } from "zustand";
import { PlayerStore } from "../types";

const useStore = create<PlayerStore>((set) => ({
  currentAudio: null,
  playing: false,
  paused: false,
  volume: 50,
  currentDuration: null,
  duration: null,

  revealLyrics: false,
  setPlaying: (val) =>
    set(() => ({
      playing: val,
    })),

  setPaused: (val) =>
    set(() => ({
      paused: val,
    })),

  setCurrentDuration: (val) =>
    set(() => ({
      currentDuration: val,
    })),

  setDuration: (val) =>
    set(() => ({
      duration: val,
    })),

  setCurrentAudio: (val) =>
    set(() => ({
      currentAudio: val,
    })),

  setRevealLyrics: (val) =>
    set(() => ({
      revealLyrics: val,
    })),

  setVolume: (val) =>
    set(() => ({
      volume: val,
    })),
}));
export const usePlayer = () => useStore();
