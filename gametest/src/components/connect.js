import io from "socket.io-client";
const client = io.connect('http://localhost:3001', { transports: ['websocket'] });
client.on('connect', () => {
  console.log('connected');
});
export default client;