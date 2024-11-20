import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "@/routers/index";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { socketHandler } from "@/socket";
import "tsconfig-paths/register";

dotenv.config();

const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Dumb merch server");
});
app.use("/api", router);

io.on("connection", (socket) => {
  socketHandler(socket, io);
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
