import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import socket from '../components/connect.js';


const JoinScreen = () => {
  const[state, setState] = useState('')
  const [gameData, setGameData] = useState('');
  const [charInfo, setCharInfo] = useState({char: 'hunter', name: 'michael'});
  const onTextChange = e => {
    setState(e.target.value);
  }
  const createGameHandler = (e) => {
    e.preventDefault();
    socket.emit('join game', state);
  }
  const onNameChange = e => {
    console.log(e.target.name, e.target.char);
    setCharInfo({...charInfo, [e.target.name]: e.target.value })
    console.log(charInfo.name, charInfo.char);
  }
  const submitChar = (e) => {
    e.preventDefault();
    console.log(charInfo);
    socket.emit('start game', charInfo);
  }
  
  useEffect(() => {
    socket.on('choose character', game => {
      setGameData(game.id);
    })
    
  })
  
  return (
    <div>
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Join a new game</Card.Title>
          <Form onSubmit={createGameHandler}>
            <Form.Group>
              <Form.Label>Enter your game code</Form.Label>
              <Form.Control type="text" placeholder="name" onChange={(e) => onTextChange(e)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <br></br>
      <p>{gameData}/</p>
      <br></br>
      <Card style={{ width: '30rem' }}>
        <Card.Title>Choose Your Character Name and role</Card.Title>
        <Form onSubmit={submitChar}>
          <Form.Control type="text" placeholder="name" name="name" onChange={(e) => onNameChange(e)}/>
          <Form.Control type="text" placeholder="role" name="char" onChange={(e) => onNameChange(e)}/>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Card>
      <Link to='/game'>
        <Button variant="primary" type="submit">Go to game</Button>
      </Link>
    </div>
  )
}
export default JoinScreen





