import express from 'express';
import 'dotenv/config';
import path from 'path';
const app = express();
import  { db }  from '../db/index';

const { PORT } = process.env;
const DIST_DIR = path.resolve(__dirname, '..', '..', 'dist');

console.log(db);
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`G'nawlinZ server listening on port http://localhost:${PORT}`);
});
