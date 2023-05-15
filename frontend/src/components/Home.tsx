import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RxPlay } from "react-icons/rx";

import { useColor } from "../store/useColor";
import { usePlayer } from "../store/usePlayer";

import { ApiResponse } from "../types";

export default function Index() {
  const { isLoading, data } = useQuery({
    queryKey: ["ids"],
    queryFn: () =>
      axios
        .get<ApiResponse[]>(`http://localhost:${SERVER_PORT}/audio`)
        .then((data) => data.data),
    keepPreviousData: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      {isLoading && <span>Loading...</span>}

      <div className="flex flex-row gap-5 flex-wrap">
        {data && data.map((value) => <Card {...value} />)}
      </div>
    </div>
  );
}

const Card = ({ id, thumbnail, name, color }: ApiResponse) => {
  const style = (i: number) => {
    return {
      background: color !== undefined ? `rgb(${color[i].value})` : "",
    };
  };
  const { setCurrentAudio, currentAudio } = usePlayer();
  const { setColor } = useColor();
  return (
    <div
      className="flex flex-col gap-2 text-lg  font-bold p-2 rounded-lg tracking-wide max-w-[200px] drop-shadow-2xl"
      style={{
        ...style(4),
      }}
      onClick={() => {
        setColor("app", {
          background: {
            gradientFrom: color?.[0].value ?? undefined,
            gradientTo: color?.[3].value ?? undefined,
          },
        });

        setColor("controller", {
          background: color?.[4].value ?? undefined,
          text: color?.[2].value ?? undefined,
        });

        setColor("lyrics", {
          background: color?.[4].value ?? undefined,
          text: color?.[2].value ?? undefined,
        });

        // Play the music
        if (currentAudio && currentAudio.id == id) return;
        setCurrentAudio({
          id,
          name,
          thumbnail,
        });
      }}
    >
      <div className="relative">
        <img
          src={thumbnail}
          className="rounded-lg"
          height={200}
          width={200}
          draggable={false}
        />

        <button
          className="absolute bottom-2 right-2 rounded-full p-3 shadow-2xl drop-shadow-2xl shadow-black"
          style={{
            ...style(0),
          }}
        >
          <RxPlay className="w-[20px] h-[20px]" />
        </button>
      </div>
      <span className="max-lg:text-base ">{name}</span>
    </div>
  );
};
