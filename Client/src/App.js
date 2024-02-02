import { useEffect, useRef, useState } from 'react';

import io from 'socket.io-client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

import './App.css';
import Home from './home/Home';

const socket = io.connect("http://localhost:8080")

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("")
  const [user, setUser] = useState();

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
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <>
      <div className="App">
        <div>
          <GoogleOAuthProvider clientId="980726447729-5aguc5eob6a90eh53mt3f7rea7dl346h.apps.googleusercontent.com">
            <Home />
            {/* <button onClick={handleLoginClick}>Login</button>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            id="google-login-button"
          /> */}

          {/* Working condition here */}
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  );
}


export default App;
