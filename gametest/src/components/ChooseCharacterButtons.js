import React, { useState, useEffect } from 'react';
import client from './connect.js';
import './Buttons.css';

const ChooseCharacterButton = (props) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setCharacters(props.characters);

  }, [props])


  const choseCharacter = (e) => {
    e.preventDefault();
    props.chosenCharacter(e)
  }

  return (
    <div>
      {characters.map((character, index) => (
        <button style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', marginRight: '30px' }} onClick={choseCharacter} key={character.role}>
          <img src={character.img} style={{ height: '150px' }} name="char" alt={character.role} />
          <p style={{ cursor: 'no-drop' }}>{character.role}</p>
        </button>
      ))}
    </div>
  )
}

export default ChooseCharacterButton 