import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';


const VideoChat = () => {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    const socket = io.connect('http://localhost:8080');

    useEffect(() => {
        // Get user media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setLocalStream(stream);
                localVideoRef.current.srcObject = stream;

                // Emit event to signal new user
                socket.emit('join', socket.id);

                // Listen for incoming calls
                socket.on('call', (callerId) => {
                    handleCall(callerId);
                });
            })
            .catch((error) => console.error('Error accessing media devices:', error));

        // Cleanup on unmount
        return () => {
            socket.emit('disconnectUser');
            if (localStream) localStream.getTracks().forEach((track) => track.stop());
        };
    }, []);

    const handleCall = (callerId) => {
        // Answer the call
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setLocalStream(stream);
                localVideoRef.current.srcObject = stream;

                // Answer the call and send your stream to the caller
                socket.emit('answer', { callerId, stream });

                // Listen for the caller's stream
                socket.on('callerStream', (callerStream) => {
                    setRemoteStream(callerStream);
                    remoteVideoRef.current.srcObject = callerStream;
                });
            })
            .catch((error) => console.error('Error answering call:', error));
    };

    return (
        <div>
            <h1>Video Chat</h1>
            <div>
                <video ref={localVideoRef} autoPlay muted playsInline />
                <video ref={remoteVideoRef} autoPlay playsInline />
            </div>
        </div>
    );
}

export default VideoChat;