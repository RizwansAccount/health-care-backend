import express from 'express';
import dotenv from "dotenv";
import loaders from './src/loaders/index.js';

async function startServer() {

  const port = 3001;

  dotenv.config();

  const app = express();
  await loaders.init({ expressApp: app });

  app.listen(port, () => {
    console.log(`Server Started ~ :${port}`);
  });

}

startServer();