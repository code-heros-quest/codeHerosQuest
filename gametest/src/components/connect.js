import io from "socket.io-client";
const client = io.connect('https://codequest-fight-forthe-kingdom.herokuapp.com/', { transports: ['websocket'] });
client.on('connect', () => {
  console.log('connected');
});
export default client;