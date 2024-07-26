import config from '../config';
import { Job } from './jobService';

export const initWebSocket = (onMessage: (job: Job) => void) => {
  const socket = new WebSocket(config.wsUrl);

  socket.onmessage = (event) => {
    const job: Job = JSON.parse(event.data);
    onMessage(job);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed. Reconnecting...');
    setTimeout(() => initWebSocket(onMessage), 2000);
  };
};
