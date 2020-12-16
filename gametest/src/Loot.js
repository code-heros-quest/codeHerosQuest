import React from 'react';



function Loot(){

    const styleLoot = {
        borderRadius: '7px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    }

    const styleImg = {
        height: '80px',
        width: 'auto' 
    }



    return(
        <div id='loot-container'>
        <section style={{ backgroundImage: 'url(./images/Loot.png)', backgroundSize: '100% 100%', padding: '2px 20px 2px 20px', height: '500px', width: '250px', margin: 'auto', backgroundRepeat: 'no-repeat', borderRadius: '7px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr 1fr', border: '1px solid black', backgroundColor: 'gray'}}>
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


{/* <ul style={{ listStyle: 'none', margin: 'auto', padding: '0'}}>
                <img src='./images/axe.png' style={{ height: '75px'}}></img>
            </ul> */}

            // <div style={{ borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '7px solid rgb(29.8, 29.8, 29.8)'}}>8</div>