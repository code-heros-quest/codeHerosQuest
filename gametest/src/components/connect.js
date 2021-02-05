import io from "socket.io-client";
const client = io.connect('https://git.heroku.com/codeheroesquest.git', { transports: ['websocket'] });
client.on('connect', () => {
  console.log('connected');
});
export default client;