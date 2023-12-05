import 'dotenv/config';
import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import { initRoutes } from '@/router';
import { createServer } from 'http';

import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  PollState,
  ServerToClientEvents,
  SocketData,
} from './types';
import { selectSinglePoll } from './models/polls.models';

const app = express();
const server = createServer(app);
app.use(
  cors({
    origin: process.env.CLIENT_URL ?? [
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initRoutes(app);

// Maintain a server-side data structure to store the current state of each poll
const pollStates: Map<string, PollState> = new Map();

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: process.env.CLIENT_URL ?? [
      'http://localhost:5173',
      'http://localhost:5174',
    ], // http://localhost:5173 is default local Vite server
    methods: ['GET', 'POST'],
  },
});

// this is middleware that Socket.IO uses on initiliazation to add
// the authenticated user to the socket instance. Note: we are not
// actually adding real auth as this is beyond the scope of the tutorial
io.use(addUserToSocketDataIfAuthenticated);

// the client will pass an auth "token" (in this simple case, just the username)
// to the server on initialize of the Socket.IO client in our React App
async function addUserToSocketDataIfAuthenticated(
  socket: Socket,
  next: (err?: Error) => void,
) {
  const user = socket.handshake.auth.token;
  if (user) {
    try {
      socket.data = { ...socket.data, user: user };
    } catch (err) {
      console.error(err);
    }
  }
  next();
}

io.on('connection', (socket: Socket) => {
  // Use an object to store the current poll ID for each socket connection
  const connectionData: { id: string | null } = { id: null };

  // retrieve poll data for the given poll id and join the room
  socket.on('joinPoll', async (pollId) => {
    connectionData.id = pollId;
    socket.join(connectionData.id!);

    // Retrieve the current poll state from the server-side storage
    const poll = pollStates.get(pollId) || (await selectSinglePoll(pollId));
    console.log(poll, '<--- the initial poll when joining');

    if (!poll || !poll.options) {
      console.error('Invalid poll state');
      return;
    }

    // Store the initial poll state in the Map
    pollStates.set(pollId, poll);
    console.log(pollStates);
    socket.emit('updateState', poll);
  });

  socket.on('vote', (opt: string, pollId: string) => {
    console.log(pollId, '<-- poll id');

    // Retrieve the current poll state from the server-side storage
    const poll = pollStates.get(pollId);

    console.log(poll, '<---- the retrieved poll');

    if (!poll || !poll.options) {
      console.error('Invalid poll state');
      return;
    }

    // Update the poll state with the new vote

    poll.options.forEach((option) => {
      console.log(socket.data.user, '<--- the socket data user');
      option.votes = option.votes.filter((user) => user !== socket.data.user);
    });

    const votedOption = poll.options.find(
      (o: { text: string; votes: string[] }) => o.text === opt,
    );

    if (votedOption) {
      votedOption.votes.push(socket.data.user);
    }

    // Update the server-side storage with the updated poll state
    pollStates.set(pollId, poll);

    console.log(pollStates.get(pollId), '<--- updated poll states');

    // Emit the updated poll state to the specific room
    io.to(pollId).emit('updateState', poll);
  });
});

export { app, server };
