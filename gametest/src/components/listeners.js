import client from './connect.js';


let gameState = {};


client.on('scenario', (scenario) => {
  gameState.scenario = scenario
  console.log('state updated - scenario')
});
client.on('result', result => {
  result.type = 'ready';
  gameState.scenario = result
  console.log('state updated - result')
})
client.on('single result', result => {
  result.type = 'none';
  gameState.scenario = result
  console.log('state updated - single result')
})
client.on('character', charPayload => {
  gameState.char = charPayload;
  console.log('char reset');
})
client.on('game over', payload => {
  gameState.scenario = payload;
  client.emit('end');
  console.log('state updated - game over')
})

export default gameState;
