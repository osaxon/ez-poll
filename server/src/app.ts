import 'dotenv/config';
import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import { expressSession } from '@/middleware/auth';
import { initRoutes } from '@/router';
import { createServer } from 'http';

import { Server, Socket } from 'socket.io';
import { SessionSocket } from './types';

const app = express();
const server = createServer(app);
app.use(
  cors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession);

initRoutes(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173', // http://localhost:5173 is default local Vite server
    methods: ['GET', 'POST'],
  },
});

io.engine.use(expressSession);

io.on('connection', (defaultSocket: Socket) => {
  console.log('connected');
  const socket = <SessionSocket>defaultSocket;
  console.log(socket.request.session);
  console.log(Object.keys(socket.request));
});

export { app, server };
