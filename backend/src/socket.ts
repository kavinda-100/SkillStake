import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { envConfig } from "../env";

export let io: Server;

export function initSocket(server: HttpServer) {
    io = new Server(server, {
        cors: {
            origin: envConfig.FRONT_END_URL || "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}
