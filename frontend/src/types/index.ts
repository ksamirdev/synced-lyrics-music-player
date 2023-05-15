export interface ApiResponse {
  id: string;
  name: string;
  thumbnail: string;
  color?: {
    type: string;
    value: number[];
  }[];
}

type ApiResponseWithoutColor = Omit<ApiResponse, "color">;

export interface PlayerStore {
  currentAudio: ApiResponseWithoutColor | null;
  playing: boolean;
  paused: boolean;
  volume: number;
  currentDuration: number | null;
  duration: number | null;
  revealLyrics: boolean;

  setPlaying: (val: boolean) => void;
  setPaused: (val: boolean) => void;
  setCurrentDuration: (val: number) => void;
  setDuration: (val: number) => void;
  setCurrentAudio: (val: ApiResponseWithoutColor) => void;
  setRevealLyrics: (val: boolean) => void;
  setVolume: (val: number) => void;
}

export interface ColorStore {
  controller: {
    background: number[] | null;
    text: number[] | null;
  } | null;
  lyrics: {
    background: number[] | null;
    text: number[] | null;
  } | null;
  app: {
    background: {
      gradientFrom: number[] | null;
      gradientTo: number[] | null;
    } | null;
    text: number[] | null;
  } | null;

  setColor: (
    type: "app" | "lyrics" | "controller",
    value:
      | {
          background?: number[];
          text?: number[];
        }
      | {
          background?: {
            gradientFrom?: number[];
            gradientTo?: number[];
          };
          text?: number[];
        }
      | null
  ) => void;
}
