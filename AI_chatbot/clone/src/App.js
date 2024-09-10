import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';


function App() {
  console.log('6559699155933aa337dbd78f9e5828dd8955c56e9bc18a5e67efbadf2f7e4ae6')
  const msgEnd=useRef(null);
  const [input, setInput]=useState("");
  const [messages, setMessages]=useState([
    {
    text: 'We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.',
    isBot:true,
  }
]);

useEffect(()=>{
  msgEnd.current.scrollIntoView();
},[messages])
  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([...messages, { text, isBot: false }]);
    try {
      const res = await sendMsgToOpenAI(text);
      setMessages([...messages, { text, isBot: false }, { text: res, isBot: true }]);
    } catch (error) {
      console.error('Failed to fetch response:', error);
      setMessages([...messages, { text: 'Error fetching response', isBot: true }]);
    }
  }; 

  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission or unexpected behavior
      await handleSend();
    }
  };
  
  const handleQuery = async (e) => {
    const text = e.currentTarget.getAttribute('value');
    if (!text) return;
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages([...messages, { text, isBot: false }, { text: res, isBot: true }]);
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatGPT</span></div>
          <button className="midBtn"onClick={()=>{window.location.reload()}}><img src={addBtn} alt="New chat" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is Programming?"}><img src={msgIcon} alt='Query' />What is programming?</button>
            <button className="query" onClick={handleQuery} value={"How to use an API?"}><img src={msgIcon} alt="Query" />How to use an API?</button>
          </div>
          
        </div>
        <div className="lowerSide">
         <div className="listItems"><img src={home} alt="" className="listItemsImg" />Home</div>
         <div className="listItems"><img src={saved} alt="" className="listItemsImg" />Saved</div>
         <div className="listItems"><img src={rocket} alt="" className="listItemsImg" />Upgrade to Premium</div>        
        </div>
      </div>
      <div className="main">
        <div className="chats"> 
          {messages.map((message,i)=>
             <div key={i} className={message.isBot?'chat bot':'chat'}>
             <img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt=''/>
             <p className='txt'>{message.text}</p>
           </div>
          )}
          <div ref={msgEnd}></div>
        </div>

        <div className='chatFooter'>
          <div className="inp">
            <input type='text' name='' id='' placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/>
            <button className='send' onClick={handleSend}>
              <img src={sendBtn} alt=''/>
            </button> 
          </div>
          <p>ChatGPT may produce information about people, places, or facts. ChatGPT August 20 Version </p>
        </div>
        

      </div>
    </div>
      
  );
}

export default App;
