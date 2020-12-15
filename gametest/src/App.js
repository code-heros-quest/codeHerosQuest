import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const client = io.connect('http://localhost:3001', {transports: ['websocket']});
client.on('connect', () => {
  console.log('connected');
});

const App = () => {
  const [state, setState] = useState({message: '', name: ''});
  const [chat, setChat] = useState([]);

  useEffect(() => {
    client.on('chat', ({name, message}) => {
      setChat([...chat, { name, message }])
    })
    client.on('intro', (scenario) => {
      setChat([...chat, { name: scenario.name, message: scenario.dialogue }])})
  })

  const onTextChange = e => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { message, name } = state;
    console.log(name, message);
    client.emit('chat', {name, message});
    setState({ message: '', name });
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }

  return (
    <div id="mario-chat">
      <h2>Kingdom chat</h2>
      <div id="chat-window">
        <div>{renderChat()}</div>
      </div>
      <form onSubmit={onMessageSubmit}>
        <input id="name" name="name" type="text" placeholder="Name" onChange={(e) => onTextChange(e)}/>
        <input id="message" name="message" type="text" placeholder="Message" onChange={(e) => onTextChange(e)}/>
        <button id="send">Send</button>
      </form>
    </div>
  )
}

export default App;


