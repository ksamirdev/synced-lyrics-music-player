import {
  RxPlay,
  RxPause,
  RxSpeakerOff,
  RxSpeakerModerate,
  RxSpeakerLoud,
  RxMagicWand,
} from "react-icons/rx";
import { FaMusic } from "react-icons/fa";

import { usePlayer } from "../store/usePlayer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useColor } from "../store/useColor";

type AudioLevel = "MUTE" | "MOD" | "LOUD";

export default function Index() {
  const player = usePlayer();
  const seekbarRef = useRef<HTMLInputElement | null>(null);
  const { controller } = useColor();
  const [audioLevel, setAutoLevel] = useState<AudioLevel>("MOD");

  useEffect(() => {
    if (!seekbarRef.current || !player.currentDuration) return;

    const VALUES = {
      initial: {
        color: `rgb(${controller?.text})`,
        value:
          ((seekbarRef.current.valueAsNumber - Number(seekbarRef.current.min)) *
            100) /
          (Number(seekbarRef.current.max) - Number(seekbarRef.current.min)),
      },
      final: {
        color: `rgb(212 212 212)`,
        value: "0px",
      },
    };

    seekbarRef.current.style.background = `linear-gradient(to right, ${VALUES.initial.color} ${VALUES.initial.value}%, ${VALUES.final.color} ${VALUES.final.value})`;
  }, [seekbarRef, player.currentDuration, controller?.text]);

  const onChange = ({
    target,
  }: Pick<ChangeEvent<HTMLInputElement>, "target">) => {
    target.style.background = `linear-gradient(to right, rgb(${
      controller?.text
    }) ${
      ((target.valueAsNumber - Number(target.min)) * 100) /
      (Number(target.max) - Number(target.min))
    }%, rgb(212 212 212) 0px`;
  };

  return (
    <div
      className="grid grid-cols-3 items-center p-3 w-full rounded-2xl select-none bg-slate-800"
      style={{
        background: `rgb(${controller?.background})`,
        color: `rgb(${controller?.text})`,
      }}
    >
      <div className="flex flex-row gap-3 items-center">
        {player.currentAudio ? (
          <img
            src={player.currentAudio.thumbnail}
            height={80}
            width={80}
            className="rounded-lg"
            alt=""
            draggable={false}
          />
        ) : (
          <div className="h-[80px] w-[80px] bg-neutral-900 rounded-lg flex">
            <FaMusic size="40" className="m-auto" />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold tracking-wide">
            {player.currentAudio?.name ?? "Playing nothing"}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow gap-3 items-center w-full">
        <div className="inline-flex gap-2 items-center">
          {player.paused ? (
            <RxPlay
              className="text-4xl cursor-pointer"
              onClick={() => {
                player.setPlaying(true);
                player.setPaused(false);
              }}
            />
          ) : (
            <RxPause
              className="text-4xl cursor-pointer"
              onClick={() => {
                player.setPlaying(false);
                player.setPaused(true);
              }}
            />
          )}
        </div>

        <span className="inline-flex gap-3 justify-center items-center w-full text-sm">
          <span>{formatDuration(player.currentDuration ?? 0)}</span>
          <input
            ref={seekbarRef}
            type="range"
            min={0}
            max={player.duration ?? 100}
            value={player.currentDuration ?? 0}
            className="w-full max-w-[30vw] h-1 bg-neutral-300 rounded-lg appearance-none cursor-pointer range-sm"
            onChange={onChange}
          />
          <span>{formatDuration(player.duration ?? 0)}</span>
        </span>
      </div>

      <div className="inline-flex gap-4 items-center ml-auto">
        <RxMagicWand
          className="text-2xl cursor-pointer lg:hidden"
          onClick={() => player.setRevealLyrics(!player.revealLyrics)}
        />

        {audioLevel == "MUTE" && (
          <RxSpeakerOff className="text-2xl cursor-pointer" />
        )}

        {audioLevel === "MOD" && (
          <RxSpeakerModerate className="text-2xl cursor-pointer" />
        )}

        {audioLevel === "LOUD" && (
          <RxSpeakerLoud className="text-2xl cursor-pointer" />
        )}

        <input
          type="range"
          min={0}
          max={100}
          value={player.volume}
          className={`h-1 rounded-lg appearance-none cursor-pointer bg-neutral-200 range-sm`}
          style={{
            background: `linear-gradient(to right, rgb(${
              controller?.text
            }) 50%, rgb(212 212 212) 0%)`,
          }}
          onChange={({ target }) => {
            player.setVolume(target.valueAsNumber);
            onChange({ target });

            if (target.valueAsNumber === 0) {
              setAutoLevel("MUTE");
            } else if (target.valueAsNumber === 100) {
              setAutoLevel("LOUD");
            } else {
              setAutoLevel("MOD");
            }
          }}
        />
      </div>
    </div>
  );
}

function formatDuration(durationInSeconds: number): string {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
}
