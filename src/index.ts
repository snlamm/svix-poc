import express from 'express';
import { getRouter as getSvixRouter } from './services/svix/router';

const app = express();
const port = 3000;

// use JSON to pass data around
app.use(express.json());

app.use('/svix', getSvixRouter());

app.get('/ping', (req, res) => res.json('pong'));

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
