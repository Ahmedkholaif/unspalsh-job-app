import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();
import v1Routes from './routes';
import { initWebSocket } from './services/webSocketService';
import requestLogger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import { completeUnresolvedJobs } from './services/jobService';
import getConfig from './config/config';

const app = express();

const PORT = getConfig().PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);

app.get('/api', (req, res) => {
  res.status(200).send('Server is running');
});

v1Routes(app);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  console.log('Completing unresolved jobs:');
  completeUnresolvedJobs();
});

initWebSocket(server);
