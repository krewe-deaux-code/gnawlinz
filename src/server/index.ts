import 'dotenv/config';
import path from 'path';

import express from 'express';
import session from 'express-session';
import passport from 'passport';

const { PORT } = process.env;
const DIST_DIR = path.resolve(__dirname, '..', '..', 'dist');

const app = express();

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
import Auth from './auth/auth'

// <-- use routes -->
app.use('/auth', Auth);

// ***********************
// ****** ENDPOINTS ******
// ***********************

app.get('/', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
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

app.listen(PORT, () => {
  console.log(`G'nawlinZ server listening on port http://localhost:${PORT}`);
})
// fix the EADDRINUSE error
.on("error", (err) => {
  process.once("SIGUSR2", () => {
    process.kill(process.pid, "SIGUSR2");
  });
  process.on("SIGINT", () => {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, "SIGINT");
  });
});



export default app;
