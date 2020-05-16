import React, { useState, useEffect } from 'react';
import './App.css';
const io = require('socket.io-client');
const socket = io('http://localhost:3000');


const Message = () => {

    const [messages, setMessages] = useState([
        {
            name: 'Eren',
            message: 'Hi'
        },
        {
            name: 'Armin',
            message: 'Hey'
        },
        {
            name: 'Eren',
            message: 'Whats up?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');

    socket.on('send message', payload => {
        // console.log('message received');
        console.log(payload);
        setMessages([...messages, { name: "Eren", message: payload }])
    })

    useEffect(() => {

        // socket.on('test1', payload => {
        //     console.log('recieved TEST 1')
        // })

        // socket.on('test2', payload => {
        //     console.log('recieved TEST 2')
        // })

        // socket.on('test3', payload => {
        //     console.log('recieved TEST 3')
        // })
    }, [])

    const handleInput = e => {
        setInputValue(e.target.value);
    }

    const sendMessage = async () => {
        // try {
        //     let result = await fetch('http://localhost:3000/api/message', {
        //         method: "POST",
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             messageContent: inputValue
        //         })
        //     });
        //     result = await result.json();
        //     console.log(result)
        // } catch (error) {
        //     console.log(error)
        // }
        socket.emit('msg', inputValue);
    }

    return (
        <div>
            <h1>Messaging</h1>
            <ul>
                {messages.map((message, i) => (
                    <li key={i}>
                        <p>{message.name}: {message.message}</p>
                    </li>
                ))}
            </ul>
            <input
                value={inputValue}
                onChange={handleInput}
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )
}

export default Message;
