import { ChangeEvent, SyntheticEvent, useEffect, useRef } from "react";
import { usePlayer } from "../store/usePlayer";

function AudioPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    currentDuration,
    paused,
    volume,
    setCurrentDuration,
    setDuration,
    setPlaying,
    setPaused,
  } = usePlayer();

  useEffect(() => {
    if (url && audioRef.current) {
      audioRef.current.src = url;

      audioRef.current.play();
      setPlaying(!audioRef.current.paused);
      setPaused(audioRef.current.paused);
    }
  }, [url, setPlaying, setPaused]);

  useEffect(() => {
    if (paused) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  }, [paused]);

  useEffect(() => {
    if (audioRef.current && currentDuration !== null) {
      console.log(currentDuration, Math.round(audioRef.current.currentTime));
      if (currentDuration != Math.round(audioRef.current.currentTime)) {
        audioRef.current.currentTime = currentDuration;
      }
    }
  }, [currentDuration]);

  useEffect(() => {
    if(audioRef.current) {
      audioRef.current.volume = volume/100
    }
  }, [volume])

  const onTimeUpdate = (event: ChangeEvent<HTMLAudioElement>) => {
    setCurrentDuration(Math.round(event.currentTarget.currentTime));
  };

  const onLoadedData = (ev: SyntheticEvent<HTMLAudioElement>) => {
    setDuration(Math.round(ev.currentTarget.duration));
  };

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    >
      <source src={url} />
      Your browser does not support the audio element.
    </audio>
  );
}

export default AudioPlayer;
