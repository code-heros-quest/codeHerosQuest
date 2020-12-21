import React, {useState, useEffect} from 'react';



function Loot(props){
    const [character, setCharacter] = useState({})
    useEffect(() => {
        setCharacter(props.character)
    }, [props])

    const styleLoot = {
        borderRadius: '7px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    }

    const styleImg = {
        height: '7vh',
        width: '4vw' 
    }



    return(
        <div id='loot-container' style={{display: 'inline-block', float: 'right'}}>
            <h1>{character.name}</h1>
            {/* <h2>Health: {character.stats.health}</h2>
            <h2>Attack: {character.stats.attack}</h2> */}
            <section style={{ backgroundImage: 'url(./images/Loot.png)', backgroundSize: '100% 100%', padding: '2px 15px 2px 15px', height: '45vh', width: '10vw', margin: 'auto', backgroundRepeat: 'no-repeat', borderRadius: '7px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr 1fr', border: '1px solid black', backgroundColor: 'gray'}}>
                <div style={styleLoot}><img style={styleImg} src='./images/icons/axe.png'></img></div>
                <div style={styleLoot}><img style={styleImg} src='./images/icons/book.png'></img></div>
                <div style={styleLoot}><img style={styleImg} src='./images/icons/gold.png'></img></div>
                <div style={styleLoot}><img style={styleImg} src='./images/icons/potion.png'></img></div>
                <div style={styleLoot}><img style={styleImg} src='./images/icons/sword.png'></img></div>
                <div style={styleLoot}><img style={styleImg} src='./images/icons/dagger.png'></img></div>
                <div style={styleLoot}><img style={styleImg} src='./images/icons/club.png'></img></div>
                <div style={styleLoot}><img style={styleImg} src='./images/icons/bow.png'></img></div>        
            </section>
        </div>
    )
}

export default Loot;


