import http from "http";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { handlePathGet, handlePathPost } from "./src/router/router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const server = http.createServer((req, res) => {
  const arrPath = req.url.split("/");

  if (req.method === "GET") {
    if (arrPath[1] === "style") {
      const filePath = path.join(__dirname, "views", ...arrPath.slice(1));
      try {
        const fileData = fs.readFileSync(filePath);
        const ext = path.extname(filePath);
        const mimeTypes = {
          ".css": "text/css",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".gif": "image/gif",
          ".svg": "image/svg+xml",
        };

        res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
        res.end(fileData);
      } catch (err) {
        console.error(`File not found: ${filePath}`);
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
      }
      return;
    }
    handlePathGet(arrPath[1], arrPath[2], req, res);
  }
  if (req.method === "POST") {
    handlePathPost(arrPath[1], arrPath[2], req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
