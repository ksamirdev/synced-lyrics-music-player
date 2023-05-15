import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

export default defineConfig({
  plugins: [react()],
  server: {
    cors: false,
  },
  envDir: "../",
  define: {
    SERVER_PORT: process.env.SERVER_PORT,
  },
});
