import io from "socket.io-client";
const client = io.connect('https://codeheroesquest.herokuapp.com/', { transports: ['websocket'] });
client.on('connect', () => {
  console.log('connected');
});
export default client;