import { useEffect, useState } from 'react';

import io from 'socket.io-client';

import './Chat.css';

const socket = io.connect("http://localhost:8080")

const Chat = (props) => {

    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("")
    const [user, setUser] = useState(props?.chat)

    const sendMessage = () => {
        socket.emit("send_message", { message, user })
    }

    const joinChat = () => {
        if (user !== '') {
            socket.emit("join_chat", user)
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            // alert(data.message)
            setMessageReceived(data.message)
        })
    }, [socket])

    useEffect(() => {
        setUser(props.chat)
        console.log("chat", props.chat)
    }, [props?.chat])

    useEffect(() => {
        joinChat()
    },[user])

    return (
        <>
            <div>
                <h3 className='selected-chat'>{props.chat}</h3>
            </div>
            <div>
                <p className='msg-recieved'>{messageReceived}</p>
                <input id='msg' type='text' onChange={(event) => setMessage(event.target.value)} placeholder='Message....' />
                <button onClick={sendMessage}>Send</button>
            </div>
        </>
    )
}

export default Chat;