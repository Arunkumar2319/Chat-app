import { useState } from 'react';

import './Home.css';
import user_image from '../images/user_image.jpg';
import videoCall from '../images/video_chat.svg';
import Chat from '../chat/Chat';
import VideoChat from '../VideoChat';

const Home = () => {

    const [chat, setChat] = useState('');
    const [vCall, setVideoCall] = useState(false)

    const onClickChat = (user) => {
        setChat(user)
        console.log(user)
    }

    const onClickVideoCall = () => {
        setVideoCall(true)
    }

    return (
        <div className='content'>
            <div className='card'>
                <h3 className='app-header'>Vi-Chat</h3>
                <h5 className='recent-chats'>Recents</h5>
                <div className='chats' onClick={() => onClickChat('Bhosley John')}>
                    <img className='chats_profile_img' src={user_image} alt='user' />
                    <span className='chats-user-name'><b>Bhosley John</b></span>
                    {/* <span><img className='msg-btn' src={message} alt='message'/></span> */}
                    <span onClick={onClickVideoCall}><img className='video-call-btn' src={videoCall} alt='video-call' /></span>
                </div>
                <div className='chats' onClick={() => onClickChat('Arun Marx')}>
                    <img className='chats_profile_img' src={user_image} alt='user' />
                    <span className='chats-user-name'><b>Arun Marx</b></span>
                    <span><img className='video-call-btn' src={videoCall} alt='video-call' /></span>
                </div>
                <div className='chats' onClick={() => onClickChat('Richard Den')}>
                    <img className='chats_profile_img' src={user_image} alt='user' />
                    <span className='chats-user-name'><b>Richard Den</b></span>
                    <span><img className='video-call-btn' src={videoCall} alt='video-call' /></span>
                </div>
            </div>
            <div className='row'>
                {/* <div className='navbar'>
                    <div className='nav-item d-flex justify-content-end'>
                        <button>Login</button>
                    </div>
                </div> */}
            </div>
                <div className='msg-window'>
                    {  vCall ? 
                        <VideoChat /> : 
                        <Chat chat={chat} />                     
                    }
                </div>
        </div>
    )
}

export default Home;