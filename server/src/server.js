import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { connectDatabase } from './config/database.js';
import { createApp } from './app.js';
import { registerSocket } from './socket.js';

dotenv.config();

const bootstrap = async () => {
  const port = process.env.PORT || 5000;
  await connectDatabase(process.env.MONGO_URI);

  const server = http.createServer();
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });

  registerSocket(io);

  const app = createApp(io);
  server.on('request', app);

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
