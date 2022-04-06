import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 9421,
    // open: true,
  },
  resolve: {
    //设置别名
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    extensions: [".ts", ".js"],
  },
});
