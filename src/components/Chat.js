import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './Chat.css'

function Chat() {
    const [newMsg, setNewMsg] = useState('');
    const [countMsg, setCountMsg] = useState(0);
    const [msg, setMsg] = useState({ 'me': [], 'bot': [] })

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const generate = async () => {
        const res = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: msg,
            temperature: 0,
            max_tokens: 7,
        });

        setMsg({ 'me': msg.me.concat(msg), 'bot': msg.bot.concat(res.data.choices[0].text) })

        return <div></div>
    }

    function handleClick(e) {
        e.preventDefault();
        setCountMsg(countMsg + 1);
        setMsg({ 'me': msg.me.concat(msg), 'bot': msg.bot })
        generate();
        setNewMsg('');
    }

    function handleChange(e) {
        setNewMsg(e.target.value);
    }

    const listMsg = countMsg > 0 ?
        (msg.me.map((item, key) => <div className='chat_bot_content-msg'><h2 className='chat_bot-msg'>Moi :</h2><p className='chat_bot-msg' key={item.key}>{item}</p>
            <h2 className='chat_bot-msg'>Bot :</h2> {msg.bot[key]}</div>))
        : (<p></p>)


    return (
        <div>
            <h1 className='title'>Chat Bot with GPT</h1>
            <div className="chat_bot" id="chat_bot">
                <div className='chat_bot_content-msg' id='chat_bot_content-msg'>
                    <h2 className='chat_bot-msg'>Bot :</h2>
                    <p className='chat_bot-msg'>Bonjour, Je suis un bot codé en React.js et utilisant GPT3 d'Open AI</p>
                </div>
                {listMsg}


            </div>
            <form className='form'>
                <input className='msg' id="msg" placeholder='Message' value={newMsg} onChange={handleChange}></input>
                <button className='btn' onClick={handleClick}>Envoyer</button>
            </form>

        </div>
    )
}

export default Chat