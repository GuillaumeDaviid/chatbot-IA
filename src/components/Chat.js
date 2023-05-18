import { useState } from 'react';
import './Chat.css'

function Chat() {

    // variables d'états qui stockent le message à envoyer, le nombre de messages envoyés et le dernier message combiné à la réponse du bot. 
    const [newMsg, setNewMsg] = useState('');
    const [countMsg, setCountMsg]= useState(0);
    const [msg, setMsg]= useState({'me': [], 'bot': []})
  
    // fonction qui incrémente le nombre de messages et réinitialise le dernier message.
    function handleClick(e){
        e.preventDefault();
        setCountMsg(countMsg + 1);
        setNewMsg('');
    }

    // met à jour la variable msg à chaque changement
    function handleChange(e){
        setNewMsg(e.target.value);
    }


    return(
        <div>
            <h1 className='title'>Chat Bot with GPT</h1>
            <div className="chat_bot" id="chat_bot">
                <div className='chat_bot_content-msg' id='chat_bot_content-msg'>
                <h2 className='chat_bot-msg'>Bot :</h2>
                <p className='chat_bot-msg'>Bonjour, Je suis un bot codé en React.js et utilisant GPT3 d'Open AI</p>
                </div>
                
                
            </div>
            <form className='form'>
                <input className='msg' id="msg" placeholder='Message'  value={newMsg} onChange={handleChange}></input>
                <button className='btn' onClick={handleClick}>Envoyer</button>
            </form>

        </div>
    )
}

export default Chat