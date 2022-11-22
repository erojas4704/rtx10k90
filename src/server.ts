import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import ass from './index';

dotenv.config();

console.log(ass);

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.static('html'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/html/index.html');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});