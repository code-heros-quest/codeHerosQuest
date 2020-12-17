import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import socket from '../components/connect.js';
const JoinScreen = () => {
  const[state, setState] = useState('')
  const onTextChange = e => {
    setState(e.target.value);
  }
  const createGameHandler = (e) => {
    e.preventDefault();
    socket.emit('join game', state);
  }
  
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
    </div>
  )
}
export default JoinScreen





