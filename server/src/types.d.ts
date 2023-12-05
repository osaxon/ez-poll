import type { Socket } from 'socket.io';

export interface SessionSocket extends Socket {
  request: SessionIncomingMessage;
}

export type PollState = {
  question: string;
  options: {
    text: string;
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
