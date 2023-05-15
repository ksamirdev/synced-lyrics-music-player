import { Router } from "express";
import LyricsClient from "sync-lyrics";

const router = Router();
const client = new LyricsClient(
  process.env.SPOTIFY_COOKIE || "AQB4V6oYwtQ7O-Zh2NK7yU_ZUGdcpimzmhvVaKnTNbbZKvSJvNBZPtea-UYH67cY4vMa3JNmy5GR6sADjcJLJzfigJyFUz0tzO-a-r8soOh1ap35BJFW8iuyDWPWuTb7bmF6mqHVmJA80y_CfWM3SMNYMRbTuqg"
);

router.get("/lyrics/:id", async (req, res) => {
  if (!req.params.id) return res.send("Parameter ID was missing!");

  const lyrics = await client.getLyrics(req.params.id);
  res.send(lyrics);
});

export default router;
