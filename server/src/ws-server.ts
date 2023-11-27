import { Server, Socket } from 'socket.io';
import { server } from './app';
import { SessionSocket } from './types';
// import { expressSession } from './middleware/auth';

const io = new Server(server);

// io.engine.use(expressSession);

function doSomethingWithSocket(socket: SessionSocket) {
  console.log('username is: ' + socket.request.session.username);
}

io.on('connection', (defaultSocket: Socket) => {
  console.log('connected');
  const socket = <SessionSocket>defaultSocket;
  doSomethingWithSocket(socket);
});

console.log(io);
