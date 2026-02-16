import { createPublicClient, webSocket } from "viem";
import { sepolia, anvil } from "viem/chains";
// import { io } from './socket';
// import prisma from "./prisma"; // Uncomment when DB ready

import ABI from "../src/abi/abi.json";
import { envConfig } from "../env";

const publicClient = createPublicClient({
    chain: envConfig.NODE_ENV === "production" ? sepolia : anvil,
    transport: webSocket(process.env.RPC_WEB_SOCKET_URL),
});

export function startBlockchainListener() {
    console.log("Listening to contract events...");

    publicClient.watchContractEvent({
        address: process.env.CONTRACT_ADDRESS as `0x${string}`,
        abi: ABI.abi,
        fromBlock: 0n,
        eventName: "ChallengeCreated",
        onLogs: async (logs) => {
            for (const log of logs) {
                console.log("New Challenge Event Log:", log);
                // const { challengeId, _creator } = log.args as any;

                // console.log("New Challenge:", challengeId.toString());

                // 1️⃣ Store in DB
                /*
				await prisma.challenge.create({
				data: {
					contractChallengeId: challengeId.toString(),
					creatorWallet: creator,
				},
				});
				*/

                // 2️⃣ Broadcast via Socket.io
                // io.emit("newChallenge", {
                //   challengeId: challengeId.toString(),
                //   creator,
                // });
            }
        },
    });
}
