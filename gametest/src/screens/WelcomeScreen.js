import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
const WelcomeScreen = () => {
  return (
    <div>
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Code Hero's Quest: Battle for the Kingdom</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">a return to Ivalice</Card.Subtitle>
          <Card.Text>
            Welcome to Code Hero's Quest! A four player interactive fantasy game. Ready to start a game? Click the link below to create a new game and recieve a code to send three of your friends to join you. Already have a code? Click join a friend's game and enter your code to start.
          </Card.Text>
          <Card.Link><Link to='/create'>Start a new game</Link></Card.Link>
          <Card.Link><Link to='/join'>Join a game</Link></Card.Link>
        </Card.Body>
      </Card>
    </div>
  )
}
export default WelcomeScreen;

















