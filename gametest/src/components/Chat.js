import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import client from './connect.js';
import './Scroll.css'

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
      //setChat([...chat, { name, message }])
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
<<<<<<< HEAD
        <h3 style={{fontSize: '1vw'}}>
        <strong>{name}:</strong> <span>{message}</span>
        </h3>
        <p style={{fontSize: '1vw', margin: '0'}}>_____________________________________</p>
=======
        <h3 style={{ fontSize: '1.6em' }}>
          <strong>{name}:</strong> <span>{message}</span>
        </h3>
        <p style={{ fontSize: '10px' }}>_____________________________________</p>
>>>>>>> 56cfee147dcc13b461181d9b54cd2568d9f594ab
      </div>
    ))
  }
  return (
<<<<<<< HEAD
    <div id="mario-chat" style={{backgroundImage: 'url(./images/scrolly.png)', backgroundAttachment: 'scroll', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '25vw', height: '35vh', marginRight: '0'}} >
      <h2 style={{ fontSize: '2vw', width: 'auto', height: 'auto',paddingLeft: '35px', paddingTop: '15px', margin: 'auto', textDecoration: 'underline', fontFamily: 'fantasy'}}><strong>Kingdom chat</strong></h2>
=======
    <div id="mario-chat" style={{ backgroundImage: 'url(./images/scrolly.png)', backgroundAttachment: 'scroll', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '550px', marginRight: '0' }} >
      <h2 style={{ fontSize: '2em', width: '300px', paddingLeft: '35px', paddingTop: '100px', margin: 'auto', textDecoration: 'underline', fontFamily: 'fantasy' }}><strong>Kingdom chat</strong></h2>
>>>>>>> 56cfee147dcc13b461181d9b54cd2568d9f594ab
      <div id="chat-window" className='scrollChat'>
        {renderChat()}
      </div>
      <Form onSubmit={onMessageSubmit}>
        {/* <Form.Label style={{ fontSize: '1.4em', paddingLeft: '50px'}}><strong>Player Name:</strong></Form.Label>
        <input style={{backgroundColor: 'rgba(199, 199, 199, 0)', borderRadius: '7px', fontSize: '1.4em', marginLeft: '5px'}} size="lg" id="name" name="name" type="text" placeholder="Name..." onChange={(e) => onTextChange(e)}/>
        <p /> */}
<<<<<<< HEAD
        <Form.Label style={{ fontSize: '1vw'}}><strong>Type Message:</strong></Form.Label>
        <span style={{display: 'flex', alignContent: 'center'}}>
        <input style={{backgroundColor: 'rgba(199, 199, 199, 0)', borderRadius: '7px', fontSize: '1.4em', marginLeft: '10%', marginBottom: '15px', height: '4vh', width: '60%'}} id="message" name="message" type="text" placeholder="Message..." onChange={(e) => onTextChange(e)}/>
        <p/>
        <button id="send" type="submit" style={{ color: 'white', boxShadow: '5px 5px 10px black', backgroundColor: '#595959', marginLeft: '5%', padding: '10px 15px', marginBottom: '35px', borderRadius: '10px', height: '4vh', width: '20%'}}>Send</button>
        </span>
=======
        <Form.Label style={{ fontSize: '1.4em', paddingLeft: '50px' }}><strong>Type Message:</strong></Form.Label>
        <input style={{ backgroundColor: 'rgba(199, 199, 199, 0)', borderRadius: '7px', fontSize: '1.4em', marginLeft: '5px', marginBottom: '15px' }} id="message" name="message" type="text" placeholder="Message..." onChange={(e) => onTextChange(e)} />
        <p />
        <button id="send" type="submit" style={{ color: 'white', boxShadow: '5px 5px 10px black', backgroundColor: '#595959', marginLeft: '45%', padding: '10px 15px', marginBottom: '35px', borderRadius: '10px' }}>Send</button>
>>>>>>> 56cfee147dcc13b461181d9b54cd2568d9f594ab
      </Form>
      <p />
    </div>
  )
}
export default Chat;