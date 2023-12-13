import { useState, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client";

export type PollState = {
    question: string;
    options: {
        text: string;
        votes: string[];
    }[];
};
interface ServerToClientEvents {
    updateState: (state: PollState) => void;
}
interface ClientToServerEvents {
    vote: (option: string, pollId: string) => void;
    joinPoll: (pollId: string) => void;
    askForStateUpdate: () => void;
}

export function useSocket({ endpoint, user }: { endpoint: string, user: string }) {
    // initialize the client using the server endpoint, e.g. localhost:8000
    // and set the auth "token" (in our case we're simply passing the username
    // for simplicity -- you would not do this in production!)
    // also make sure to use the Socket generic types in the reverse order of the server!
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
        socketIOClient(endpoint, {
            auth: {
                token: user,
            },
        });

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        console.log("useSocket >> useEffect", endpoint, socket);

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    // we return the socket client instance and the connection state
    return {
        isConnected,
        socket,
    };
}
