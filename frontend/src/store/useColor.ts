import { create } from "zustand";
import { produce } from "immer";
import { ColorStore } from "../types";

const useStore = create<ColorStore>((set) => ({
  app: null,
  controller: null,
  lyrics: null,

  setColor: (type, value) =>
    set(
      produce((state) => {
        state[type] = value;
      })
    ),
}));

export const useColor = () => useStore();
