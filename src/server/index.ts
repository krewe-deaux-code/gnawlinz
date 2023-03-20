import 'dotenv/config';
import path from 'path';
import http from 'http'; // sockets

import express from 'express';
import session from 'express-session';
import passport from 'passport';

import { Server } from 'socket.io'; // sockets
const { PORT } = process.env;
const DIST_DIR = path.resolve(__dirname, '..', '..', 'dist');
const DIST_DIR_LOGIN = path.resolve(__dirname, '..', '..', 'dist', 'login');

const app = express();
const server = http.createServer(app); // pass our express server to http

// <-- middleware -->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

// <-- session -->
app.use(session({
  secret: 'typescript is great.',
  resave: false,
  saveUninitialized: false
  // cookie: { maxAge: 1000 * 60 * 60 * 24 },
  // store //connect-mongodb-session // <-- above lines ?? new MemoryStore() ??
}));
app.use(passport.initialize());
app.use(passport.session()); // 18 - 26 ***

// <-- express router -->
import cloudinaryRouter from './dbRoutes/external/cloudinary';
import Auth from './auth/auth';
import allyRouter from './dbRoutes/ally';
import charAllyRouter from './dbRoutes/character_ally';
import characterRouter from './dbRoutes/character';
import choiceRouter from './dbRoutes/choice';
import enemyRouter from './dbRoutes/enemy';
import eventRouter from './dbRoutes/event';
import itemRouter from './dbRoutes/item';
import locationRouter from './dbRoutes/location';
import storyRouter from './dbRoutes/story';
import userRouter from './dbRoutes/user';
import bossRouter from './dbRoutes/boss';
//import iconRouter from './dbRoutes/icon';

// <-- use routes -->
app.use('/cloudinary', cloudinaryRouter);
app.use('/auth', Auth);
app.use('/ally', allyRouter);
app.use('/charAlly', charAllyRouter);
app.use('/character', characterRouter);
app.use('/choice', choiceRouter);
app.use('/enemy', enemyRouter);
app.use('/event', eventRouter);
app.use('/item', itemRouter);
app.use('/location', locationRouter);
app.use('/boss', bossRouter);
app.use('/story', storyRouter);
app.use('/user', userRouter);
//app.use('/icon', iconRouter);

// ***********************
// ****** ENDPOINTS ******
// ***********************

app.get('/', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR_LOGIN, 'index.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

// ***********************
// *** WEBSOCKETS SETUP ***
// ***********************

const io = new Server(server); // Create a new Socket.io server instance and pass in the HTTP server instance

// ↓ ALL socket events should happen inside
// ↓ io.on('connection') block to ensure all
// ↓ events are registered to each connected client
io.on('connection', (socket) => {
  console.log('A client has connected!', socket.id);
  // send a message to the client
  socket.emit('Comment ça plume', '...cocodrie');
  // receive a message from the client
  socket.on('player_died', (charName = 'someone', location = 'somewhere', cause = 'heart attack') => {
    const death = `- ${charName} died from a ${cause} at ${location}`;
    console.log(death);
    socket.broadcast.emit('kill_feed', death); // socket.broadcast.emit **
  });
  // user disconnects from socket
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// ***********************
// *** LISTEN/WILDCARD ***
// ***********************

// <-- SERVER WILDCARD -->
app.get('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.listen(PORT, () => {
  console.log(`G'nawlinZ server listening @ http://localhost:${PORT}`);
})
  // fix the EADDRINUSE error
  .on('error', (err) => {
    process.once('SIGUSR2', () => {
      process.kill(process.pid, 'SIGUSR2');
    });
    process.on('SIGINT', () => {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, 'SIGINT');
    });
  });



export default app;
