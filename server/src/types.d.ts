import type { Socket } from 'socket.io';

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
