import http from "http";
import app from "./src/app";
import { initSocket } from "./src/socket";
import { envConfig } from "./env";
// import { startBlockchainListener } from './src/blockchain';

const PORT = envConfig.PORT || 5000;

async function bootstrap() {
    const server = http.createServer(app);

    // Initialize Socket.io
    initSocket(server);

    // Start blockchain listener
    // TODO: Uncomment the line below to start listening to blockchain events once contract are implemented and deployed
    // startBlockchainListener();

    server.listen(PORT, () => {
        console.log(`🚀 Server running on port http://localhost:${PORT}`);
        console.log(`📡 Listening to blockchain events...`);
        console.log(`📡 Listening to socket events...`);
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
        console.log("Shutting down...");
        server.close(() => process.exit(0));
    });
}

bootstrap();
