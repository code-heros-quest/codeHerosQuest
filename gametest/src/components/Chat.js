import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import client from './connect.js';
import './Scroll.css';

let chatArr = []

const Chat = (props) => {
  const [character, setCharacter] = useState({});
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);
  useEffect(() => {
    setCharacter(props.character)
    console.log('setting chat character from props')
  }, [props.character])
  useEffect(() => {
    setState({ name: character.name })
    console.log('setting chat name state')
  }, [character])
  useEffect(() => {
    client.on('chat', ({ name, message }) => {
      chatArr.unshift({ name, message })
      setChat(chatArr.slice(0))
      console.log('setting chat')
    })

  }, [setChat])
  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { message, name } = state;
    console.log(name, message);
    client.emit('chat', { name, message });
    setState({ message: '', name });
    let doc = document.getElementById('message');
    doc.value = '';
  }
  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>

        <h3 style={{fontSize: '1vw'}}>
        <strong style={{ fontSize: '1.2em'}}>{name}:</strong> <span style={{ fontSize: '1.1em'}}>{message}</span>
        <p style={{ fontSize: '8px', margin: '0'}}>___________________________</p>
        </h3>

      </div>
    ))
  }
  return (

    <div id="mario-chat" style={{ backgroundImage: 'url(./images/scroll2.png)'}}>
      <h2 style={{ fontSize: '1.6em', width: 'auto', height: 'auto', paddingTop: '35px', marginBottom: '10px', textDecoration: 'underline', fontFamily: 'fantasy'}}><strong>Kingdom chat</strong></h2>

      <div id="chat-window" className='scrollChat'>
        {renderChat()}
      </div>
      <Form onSubmit={onMessageSubmit}>
        <Form.Label style={{ fontSize: '1em'}}><strong>Type Message:</strong></Form.Label>
        <span style={{display: 'flex', alignContent: 'center'}}>
        <input id="message" name="message" type="text" placeholder="Message..." onChange={(e) => onTextChange(e)}/>
        <p/>
        <button id="send" type="submit" >Send</button>
        </span>
      </Form>
      <p />
    </div>
  )
}
export default Chat;