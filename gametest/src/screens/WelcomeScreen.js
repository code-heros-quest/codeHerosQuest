import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';



const WelcomeScreen = () => {
  return (
    <div style={{background: 'none', marginTop: '350px', textAlign: 'center'}}>
      <div style={{ margin: 'auto', backgroundImage: 'url(./images/scroll.png)', backgroundSize: '100% 100%', borderRadius: '10px', fontSize: '1.7em', color: 'black', display: 'inline-block', width: '935px', minHeight: '610px', height: 'auto', padding: '5px 10px 10px 10px'}}>   
        <Card.Body style={{ marginLeft: '70px', marginTop: '100px', width: '750px'}}>
          <Card.Title style={{ fontSize: '1.5em', fontWeight: 'bolder', fontFamily: 'cursive'}}>Code Hero's Quest: Battle for the Kingdom</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">a return to Ivalice</Card.Subtitle>
          <Card.Text style={{ fontWeight: 'bold'}}>
            Welcome to Code Hero's Quest! A four player interactive fantasy game. Ready to start a game? Click the link below to create a new game and recieve a code to send three of your friends to join you. Already have a code? Click join a friend's game and enter your code to start.
          </Card.Text>
          <span style={{margin: 'auto', display: 'block', textAlign: 'center', paddingRight: '20px'}} ><Card.Link ><Link to='/create'>Start a new game</Link></Card.Link>
          <Card.Link><Link to='/join'>Join a game</Link></Card.Link></span>
        </Card.Body>
      </div>
    </div>
  )
}
export default WelcomeScreen;

















