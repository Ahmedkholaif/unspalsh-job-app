import { Server } from 'http';
import WebSocket from 'ws';

let clients: WebSocket[] = [];

export const initWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws: WebSocket) => {
    clients.push(ws);

    ws.on('close', () => {
      clients = clients.filter((client) => client !== ws);
    });
  });
};

export const notifyClients = (data: any) => {
  console.log('Notifying clients:', data.id);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
