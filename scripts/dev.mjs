import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";

const startPort = Number.parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "127.0.0.1";

function canListen(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });

    server.listen(port, host);
  });
}

async function findOpenPort(fromPort) {
  for (let port = fromPort; port < fromPort + 20; port += 1) {
    if (await canListen(port)) {
      return port;
    }
  }

  throw new Error(`No available local dev port found from ${fromPort} to ${fromPort + 19}.`);
}

const port = await findOpenPort(startPort);
const nextBin = path.join(
  process.cwd(),
  "node_modules",
  ".bin",
  process.platform === "win32" ? "next.cmd" : "next"
);

console.log(`Starting Mandy Express dev server at http://localhost:${port}`);

const child = spawn(nextBin, ["dev", "--webpack", "--hostname", host, "--port", String(port)], {
  env: {
    ...process.env,
    WATCHPACK_POLLING: "true"
  },
  stdio: "inherit"
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
