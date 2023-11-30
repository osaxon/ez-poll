import type { IncomingMessage } from 'http';
import type { SessionData } from 'express-session';
import type { Socket } from 'socket.io';

declare module 'express-session' {
  interface SessionData {
    username: string;
    // ... the rest of the variables you intent to store in the session object
  }
}

interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData;
}

export interface SessionSocket extends Socket {
  request: SessionIncomingMessage;
}

type PollState = {
  question: string;
  options: {
    id: number;
    text: string;
    description: string;
    votes: string[];
  }[];
};

type ClientToServerEvents = {
  vote: (optionId: number) => void;
  askForStateUpdate: () => void;
};
type ServerToClientEvents = {
  updateState: (state: PollState) => void;
};
interface InterServerEvents {}
type SocketData = {
  user: string;
};
