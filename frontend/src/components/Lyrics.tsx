import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { RxSymbol } from "react-icons/rx";
import { usePlayer } from "../store/usePlayer";
import { useColor } from "../store/useColor";

interface Response {
  lines: { words: string; time: string }[];
  language: string;
}

export default function Index() {
  const player = usePlayer();
  const { lyrics } = useColor();

  const fetchData = async (id: string | undefined) => {
    if (!id) return;
    const { data } = await axios.get<Response>(
      `http://localhost:${SERVER_PORT}/lyrics/${id}`
    );
    return data;
  };
  const { isFetching, data, refetch } = useQuery({
    queryKey: ["lyrics"],
    queryFn: async () => await fetchData(player.currentAudio?.id),
    cacheTime: 1000 * 60 * 69 * 69,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: false,
  });

  useEffect(() => {
    if (player.currentAudio) {
      refetch();
    }
  }, [player.currentAudio, refetch]);

  useEffect(() => {
    if (!player.currentDuration || !data) return;
    const element = document.querySelector('[data-id="lyrics-container"]');

    if (element) {
      const child = document.querySelector(
        `[data-position="${findNearestSmallerNumber(
          player.currentDuration * 1000,
          data.lines.map((d) => Number(d.time)) ?? [0]
        )}"]`
      ) as HTMLElement;

      if (child) {
        const containerHeight = element.clientHeight;
        const childTop = child.offsetTop;
        const childHeight = child.offsetHeight;

        const scrollTop = Math.max(
          0,
          childTop - (containerHeight - childHeight) / 2
        );

        element.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      }
    }
  }, [data, player.currentDuration]);

  const findNearestSmallerNumber = (num: number, arr: number[]): number => {
    let smallest = -Infinity;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < num && arr[i] > smallest) {
        smallest = arr[i];
      }
    }
    return smallest;
  };

  return (
    <div
      className={`bg-slate-800 lg:h-full max-lg:max-h-[82vh] max-lg:fixed max-lg:right-5 max-lg:left-5 max-lg:bottom-5 max-lg:z-50 duration-200 ease-linear relative ${
        player.revealLyrics ? "max-lg:top-5" : "max-lg:top-full"
      }`}
      style={{
        background: `rgb(${lyrics?.background})`,
        borderRadius: "1rem",
      }}
    >
      {isFetching && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
          <RxSymbol size="40" className="animate-spin" />
          <span className="tracking-wide">Loading..</span>
        </span>
      )}

      <div
        className="flex flex-col text-4xl md:text-2xl lg:text-3xl lg:gap-4 font-bold tracking-wide gap-5 break-all overflow-scroll md:max-h-[80vh] lg:max-h-[83vh] p-5 items-center"
        data-id="lyrics-container"
      >
        {data &&
          data.lines.map((data) => (
            <span
              onClick={() =>
                player.currentAudio &&
                player.setCurrentDuration(Number(data.time) / 1000)
              }
              className={`cursor-pointer`}
              data-position={data.time}
              style={{
                color: `rgb(${lyrics?.text})`,
                opacity:
                  Number(data.time) < (player.currentDuration ?? 100) * 1000
                    ? "100%"
                    : "50%",
              }}
              onMouseEnter={(ev) => (ev.currentTarget.style.opacity = "100%")}
              onMouseLeave={(ev) =>
                (ev.currentTarget.style.opacity =
                  Number(data.time) < (player.currentDuration ?? 100) * 1000
                    ? "100%"
                    : "50%")
              }
            >
              {data.words}
            </span>
          ))}

        <span className="text-base  ">
          Lyrics provided by:{" "}
          <a
            target="_black"
            style={{
              color: `rgb(${lyrics?.text})`,
            }}
            href="https://github.com/samocodes/sync-lyrics"
          >
            sync-lyrics
          </a>
        </span>
      </div>
    </div>
  );
}
