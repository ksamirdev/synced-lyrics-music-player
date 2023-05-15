import React, { useEffect, useState } from "react";

import { useColor } from "./store/useColor";
import { usePlayer } from "./store/usePlayer";

import Home from "./components/Home";
import Lyrics from "./components/Lyrics";
import Controller from "./components/Controller";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const { app } = useColor();
  const { currentAudio } = usePlayer();

  useEffect(() => {
    if (currentAudio) {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `http://localhost:${SERVER_PORT}/audio/${currentAudio.id}`
      );
      xhr.responseType = "blob";
      xhr.onload = () => {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        }
      };

      xhr.send();
    }
  }, [currentAudio]);

  return (
    <React.Fragment>
      <AudioPlayer url={audioUrl} />
      <div
        className="h-screen w-screen bg-neutral-900 text-neutral-100 flex flex-col p-5 gap-5"
        style={{
          background: `linear-gradient(
              rgb(${app?.background?.gradientFrom}), 
              #000 100%
            )`,
        }}
      >
        <div className="lg:grid md:flex lg:grid-cols-2 md:flex-col md:gap-3 h-full w-full ">
          <Home />
          <Lyrics />
        </div>

        <div>
          <Controller />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
