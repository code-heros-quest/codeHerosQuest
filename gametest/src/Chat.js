import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const client = io.connect('http://localhost:3001', {transports: ['websocket']});
client.on('connect', () => {
  console.log('connected');
});

const Chat = () => {
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
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }

  // const renderScene = () => {
  //   return scene.map(({ name, message }, index) => (
  //     <div key={index}>
  //       <h3 style={{display: 'block'}}>
  //         {name}
  //       </h3>
  //       <span style={{ width: '650px', height: 'auto'}}>{message}</span>
  //     </div>
  //   ))
  // }

  return (
    <div id="mario-chat" variant='primary' style={{ backgroundColor: 'lightgray', border: '3px solid lightgray', borderRadius: '9px', width: '500px', minHeight: '200px', height: 'auto', margin: 'auto', display: 'inline-block'}}>
      <h2 style={{ paddingLeft: '10px', borderBottom: '1px solid gray'}}>Kingdom chat</h2>
      <div id="chat-window" style={{ paddingTop: '5px', type: 'scroll', backgroundColor: 'white', width: 'auto', minHeight: '260px', height: '100%', borderBottom: '1px solid gray', padding: '10px'}}>
        {renderChat()}
      </div>
      <Form onSubmit={onMessageSubmit}>
      <Form.Label style={{ fontSize: '1.3em', paddingLeft: '10px'}}>Player Name</Form.Label>
        <Form.Control size="lg" id="name" name="name" type="text" placeholder="Name" onChange={(e) => onTextChange(e)}/>
        <p />
        <Form.Label style={{ fontSize: '1.3em', paddingLeft: '10px'}}>Type Message</Form.Label>
        <Form.Control size="lg" id="message" name="message" type="text" placeholder="Message" onChange={(e) => onTextChange(e)}/>
        <p/>
        <Button size="lg" id="send" variant="primary" type="submit" style={{ marginLeft: '10px', marginBottom: '10px'}}>Send</Button>
      </Form>

      <p/>
    </div>
  )
}

export default Chat;


