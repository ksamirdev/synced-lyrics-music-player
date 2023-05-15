import express from "express";
import dotenv from "dotenv";

import AudioRouter from "./routes/Audio";
import LyricsRouter from "./routes/Lyrics";

dotenv.config({ path: "../../.env" });

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/", AudioRouter);
app.use("/", LyricsRouter);

app.listen(PORT, () => {
  console.log(`Server is live at port ${PORT} !`);
});
