import fs from "fs";
import { Router } from "express";
import { getColorsForThumbnail } from "../utils/ThumbnailColor";
import { data } from "../data";
import path from "path";

const router = Router();

router.get("/audio", async (_, res) => {
  for (const value of data) {
    value.color = await getColorsForThumbnail(value.thumbnail);
  }

  res.send(data);
});

router.get("/audio/:id", async (req, res) => {
  const filePath = path.join(__dirname, `../../music/${req.params.id}.mp4`);
  const stat = await fs.promises.stat(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

export default router;
