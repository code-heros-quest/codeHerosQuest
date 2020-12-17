import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'




const Chat = (props) => {
  const client = props.client;
  const [state, setState] = useState({message: '', name: ''});
  const [chat, setChat] = useState([]);


  useEffect(() => {
    client.on('chat', ({name, message}) => {
      setChat([...chat, { name, message }])
    })
    
    client.on('result', payload => {
      setChat([...payload, { name: payload.name, message: payload.dialogue }])
      // do ready check, serve payload.num
    })
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
        <h3 style={{fontSize: '1.6em'}}>
        <strong>{name}:</strong> <span>{message}</span>
        </h3>
        <p style={{fontSize: '10px'}}>_____________________________________</p>
      </div>
    ))
  }

  return (
    <div id="mario-chat" style={{backgroundImage: 'url(./images/scrolly.png)', backgroundAttachment: 'scroll', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '550px', marginRight: '0'}} >
      <h2 style={{ fontSize: '2em', width: '300px', paddingLeft: '35px', paddingTop: '100px', margin: 'auto', textDecoration: 'underline', fontFamily: 'fantasy'}}><strong>Kingdom chat</strong></h2>
      <div id="chat-window" style={{ paddingTop: '5px', width: '520px', minHeight: '260px', height: 'auto', padding: '30px 0 30px 30px'}}>
        {renderChat()}
      </div>
      <Form onSubmit={onMessageSubmit}>
      <Form.Label style={{ fontSize: '1.4em', paddingLeft: '50px'}}><strong>Player Name:</strong></Form.Label>
        <input style={{backgroundColor: 'rgba(199, 199, 199, 0)', borderRadius: '7px', fontSize: '1.4em', marginLeft: '5px'}} size="lg" id="name" name="name" type="text" placeholder="Name..." onChange={(e) => onTextChange(e)}/>
        <p />
        <Form.Label style={{ fontSize: '1.4em', paddingLeft: '50px'}}><strong>Type Message:</strong></Form.Label>
        <input style={{backgroundColor: 'rgba(199, 199, 199, 0)', borderRadius: '7px', fontSize: '1.4em', marginLeft: '5px', marginBottom: '15px'}} id="message" name="message" type="text" placeholder="Message..." onChange={(e) => onTextChange(e)}/>
        <p/>
        <button id="send" type="submit" style={{ color: 'white', boxShadow: '5px 5px 10px black', backgroundColor: '#595959', marginLeft: '45%', padding: '10px 15px', marginBottom: '35px', borderRadius: '10px'}}>Send</button>
      </Form>
      <p/>
    </div>
  )
}

export default Chat;

