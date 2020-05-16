import React, { useState, useEffect } from 'react';
import './App.css';

const Message = () => {

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {

    }, [])

    const handleInput = e => {
        setInputValue(e.target.value);
    }

    const sendMessage = async () => {
        // console.log(`message is: ${inputValue}`);
        // setInputValue('');
        try {
            let result = await fetch('http://localhost:3000/api/message', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messageContent: inputValue
                })
            });
            result = await result.json();
            console.log(result)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <h1>Messaging</h1>
            <input
                value={inputValue}
                onChange={handleInput}
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )
}

export default Message;
