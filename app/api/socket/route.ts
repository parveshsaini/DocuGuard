import { Server } from "socket.io";
import { Server as NetServer } from "http";

export default function handler(req, res) {
  if (req.method === 'POST') {
    // This will upgrade the connection to a WebSocket connection
    const netServer = new NetServer(req.socket);
    const io = new Server(netServer);

    // Your Socket.IO logic goes here

    netServer.listen(); // This activates the WebSocket connection
  }

  // Send a response to prevent the request from hanging
  res.status(200).send('doneee');
}

import { NextApiRequest, NextApiResponse } from 'next';

export const post = async (req: NextApiRequest, res: NextApiResponse) => {
  // Your existing code here...

  res.status(200).json({ message: 'Success' });
};
