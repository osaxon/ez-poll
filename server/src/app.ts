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
  ServerToClientEvents,
  SocketData,
} from './types';

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

io.on('connection', (socket: Socket) => {
  socket.on('joinPoll', (pollId) => {
    console.log(pollId);
  });
});

export { app, server };
