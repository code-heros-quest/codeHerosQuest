import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import socket from '../components/connect.js';


const styleShow = {
  margin: 'auto', 
  backgroundImage: 'url(./images/scroll.png)', 
  backgroundSize: '100% 100%', 
  borderRadius: '10px', 
  fontSize: '1.7em', 
  color: 'black', 
  display: 'inline-block', 
  width: '935px', 
  minHeight: '610px', 
  height: 'auto', 
  padding: '5px 10px 10px 10px',
}
const styleHide = {
  display: 'none'
}
let characterPicked = null;

const CreateScreen = () => {
  const [state, setState] = useState('');
  const [gameData, setGameData] = useState('');
  const [charInfo, setCharInfo] = useState({ char: '', name: ''});
  const [startTheme, setStartTheme] = useState(styleShow);
  const [charTheme, setCharTheme] = useState(styleHide);
  const [gameTheme, setGameTheme] = useState(styleHide);
  const [nameTheme, setNameTheme] = useState(styleHide);
  const [startButton, setStartButton] = useState(true);
  const [availableCharacters, setAvailableCharacters] = useState([]);

  useEffect(() => {
    socket.on('char array', charArray => {
      setAvailableCharacters(charArray);
    }, [setAvailableCharacters])
  })
  useEffect(() => {
    console.log(availableCharacters, 'available')
    if (availableCharacters.length === 0) {
      setStartButton();
    }
  }, [availableCharacters, setStartButton])

  // ------------ CHANGE THEMES/ SHOW SELECTED FORMS ------------- //

  const changeTheme = () =>{
    setStartTheme(styleHide);
    setCharTheme(styleShow);
  }

  const showGameLink = () =>{
    setNameTheme(styleHide);
    setGameTheme(styleShow);
  }

  //-------------- CHOSEN CHARACTER FUNCTION ---------- //

  const chosenCharacter = (e) =>{
    e.preventDefault();
    setCharInfo({...charInfo, [e.target.name]: e.target.alt}) 
    if(e.target.alt === 'Hunter'){
      setCharTheme(styleHide);
      setNameTheme(styleShow);
       characterPicked = <img src='./images/Hunter.png' style={{height: '150px', marginTop: '110px'}} name="char" alt="Hunter"/>;
      socket.emit('choose character', 'Hunter')
      return characterPicked;
    }
    if(e.target.alt === 'Assassin'){
      setCharTheme(styleHide);
      setNameTheme(styleShow);
      characterPicked = <img src='./images/Assassin.png' style={{height: '120px', marginTop: '131px'}} name="char" alt="Assassin" />;
      socket.emit('choose character', 'Assassin')
      return characterPicked;
    }
    if(e.target.alt === 'Wizard'){
      setCharTheme(styleHide);
      setNameTheme(styleShow);
      characterPicked = <img src='./images/Wizard.png' style={{height: '150px', marginTop: '110px'}} name="char" alt="Wizard"/>;
      socket.emit('choose character', 'Wizard')
      return characterPicked;
    }
    if(e.target.alt === 'Warrior'){
      setCharTheme(styleHide);
      setNameTheme(styleShow);
      characterPicked = <img src='./images/Warrior.png' style={{height: '150px', paddingRight: '10px', marginTop: '110px'}} name="char" alt="Warrior" />;
      socket.emit('choose character', 'Warrior')
      return characterPicked;
    }
    else{
      return alert('error in character picked function')
    }
  }


  const onTextChange = (e) => {
    setState(e.target.value);
  }
  const createGameHandler = (e) => {
    e.preventDefault();
    socket.emit('create game', state);
    changeTheme();
  }
  
  const onNameChange = (e) => {
    e.preventDefault();
    setCharInfo({...charInfo, [e.target.name]: e.target.value}) 
    console.log(charInfo.name, charInfo.char);
  }
  const submitChar = (e) => {
    e.preventDefault();
    console.log(charInfo)
    socket.emit('start game', charInfo);
    <Link to='/game'>Join a game</Link>
  }
  
  useEffect(() => {
    socket.on('choose character', game => {
      setGameData(game);
    })
    
  })

  const buttonStyle={
    color: 'white', 
    boxShadow: '5px 5px 10px black', 
    backgroundColor: '#595959', 
    borderRadius: '10px', 
    fontSize: '1em',
    padding: '5px 10px',
  }

  return (
    <div style={{background: 'none', marginTop: '250px', textAlign: 'center'}}>
      <div style={startTheme}>
      <Card.Body style={{ marginLeft: '70px', marginTop: '140px', width: '750px'}}>
      <Card.Title style={{ fontSize: '1.5em', fontWeight: 'bolder', fontFamily: 'cursive'}}>START A NEW GAME</Card.Title>
          <Form onSubmit={createGameHandler}>
            <Form.Group>
              <Form.Label>Enter a name for your game</Form.Label>
              <p></p>
              <Form.Control style={{width: '40%', margin: 'auto'}} type="text" placeholder="name..." onChange={(e) => onTextChange(e)}/>
            </Form.Group>
            <button style={buttonStyle} type="submit">Submit</button>
          </Form>
        </Card.Body>
      
      </div>

      <div style={charTheme}>
        <Card.Title style={{ fontSize: '1.5em', fontWeight: 'bolder', fontFamily: 'cursive', marginTop: '150px'}}>CHOOSE YOUR CHARACTER</Card.Title>
        <br></br>
          <button style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', marginRight: '30px'}} onClick={chosenCharacter}> <img src='./images/Hunter.png' style={{height: '150px'}} name="char" alt="Hunter"/><p style={{cursor: 'no-drop'}}>Hunter</p></button>
          <button style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', marginRight: '30px'}} onClick={chosenCharacter}> <img src='./images/Assassin.png' style={{height: '150px'}} name="char" alt="Assassin" /><p style={{cursor: 'no-drop'}}>Assassin</p></button>
          <button style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', marginRight: '30px'}} onClick={chosenCharacter}> <img src='./images/Wizard.png' style={{height: '120px', marginTop: '30px'}} name="char" alt="Wizard"/><p style={{cursor: 'no-drop'}}>Wizard</p></button>
          <button style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', marginRight: '30px'}} onClick={chosenCharacter}> <img src='./images/Warrior.png' style={{height: '150px', paddingRight: '10px'}} name="char" alt="Warrior" /><p style={{cursor: 'no-drop'}}>Warrior</p></button>
      </div>

      <div style={nameTheme}>
      <div>{characterPicked}</div>
      <h3>{charInfo.char}: {charInfo.name} </h3>
        <Card.Title style={{ fontSize: '1.5em', marginTop: '10px', fontWeight: 'bolder', fontFamily: 'cursive'}}>Type Your Character Name</Card.Title>   
          <Form onSubmit={submitChar}>
          <Form.Control style={{width: '40%', margin: '30px auto 10px auto'}} type="text" placeholder="name" name="name" onChange={(e) => onNameChange(e)}/>
          {/* <Form.Control style={{width: '40%', margin: '10px auto 10px auto'}} type="text" placeholder="role" name="char" onChange={(e) => onNameChange(e)}/> */}
          <button  style={buttonStyle} type="submit" onClick={showGameLink}>Submit</button>
        </Form>
      </div>


      <div style={gameTheme}>
        <div style={{ margin: '0'}}>{characterPicked}</div>
        <h3>{charInfo.char}:  {charInfo.name}</h3>
        <h1 style={{ fontSize: '1.5em', fontWeight: 'bolder', fontFamily: 'cursive', marginTop: '30px'}}>Start Your Quest</h1>
        <Card.Title style={{ fontSize: '1.3em', fontWeight: 'bolder', fontFamily: 'cursive', color: 'black' }}>Share your game code with 3 friends: {gameData}</Card.Title>
        <Link to='/game' >
        <button type="submit" style={buttonStyle}>Start</button>
        </Link>
      </div>

    </div>
  )
}
export default CreateScreen