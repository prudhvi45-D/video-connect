import React, { useRef, useState, useEffect } from 'react';
import '../styles/videomeet.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import io from "socket.io-client";

const serve_url = "https://localhost:8000";
const connections = {};

const peerConfigConnections = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ]
};

export default function Videomeet() {
  const socketRef = useRef();
  const socketidRef = useRef();
  const localVideoRef = useRef();
  const videoRef = useRef([]);

  const [videoAvailable, setVideoAvailable] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(false);
  const [askForUsername, setAskForUsername] = useState(true);
  const [screenAvailable, setScreenAvailable] = useState(false);
  const [username, setUsername] = useState("");
  const [videos, setVideos] = useState(false);
  const [audio, setAudio] = useState(false);
  
  useEffect(() => {
    getPermissions();
  }, []);

  const getUserMedia = () => {
    if ((videos && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({
        video: videos,
        audio: audio,
      }).then((stream) => {
        window.localStream = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      try {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          let tracks = localVideoRef.current.srcObject.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (videos !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [videos, audio]);
const connectToSocketServer = () => {
  socketRef.current = io.connect(serve_url, { secure: false });

  socketRef.current.on("connect", () => {
    console.log("Connected to signaling server");

    socketRef.current.emit("join-call", window.location.href);
    socketidRef.current = socketRef.current.id;

    // Optional chat listener
    socketRef.current.on("chatmessage", addMessage);

    // Handle user disconnection
    socketRef.current.on("user-left", (id) => {
      setVideos((videos) => videos.filter((v) => v.id !== id));
    });
    socketRef.current.on("user-joined", (id, clients) => {
      clients.forEach((client) => {
        connections[client] = new RTCPeerConnection(peerConfigConnections);
        if(event.candidate != null) {
          socketRef.current.emit("signal", client, JSON.stringify({'ice':event.candidate}));
        } 
      });
    });
  });
};


  const getMedia = () => {
    setVideos(videoAvailable);
    setAudio(audioAvailable);
    // connectToSocketServer(); // TODO: Implement this function
  };

  const connect = () => {
    if (!username.trim()) return alert("Enter a name to join");
    setAskForUsername(false);
    getMedia();
    // TODO: Setup socket, media stream, and peer connections here
  };

  const getPermissions = async () => {
    try {
      // Check video permissions
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true, 
      });
      if (videoPermission) {
        setVideoAvailable(true);
        videoPermission.getTracks().forEach(track => track.stop()); // Stop the test stream
      }
    } catch (err) {
      console.log("Video not available:", err);
      setVideoAvailable(false);
    }

    try {
      // Check audio permissions (fix: was checking video instead of audio)
      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true, 
      });
      if (audioPermission) {
        setAudioAvailable(true);
        audioPermission.getTracks().forEach(track => track.stop()); // Stop the test stream
      }
    } catch (err) {
      console.log("Audio not available:", err);
      setAudioAvailable(false);
    }

    // Check screen share availability
    if (navigator.mediaDevices.getDisplayMedia) {
      setScreenAvailable(true);
    } else {
      setScreenAvailable(false);
    }
  };

  return (
    <div>
      {askForUsername ? (
        <div className="videomeet-header">
          <h2>Enter into lobby</h2>
          <TextField 
            id="outlined-basic"
            label="Enter your name" 
            variant="outlined" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <Button variant="contained" onClick={connect}>Join</Button>
        </div>
      ) : (
        <div>
          <video ref={localVideoRef} autoPlay muted></video>
        </div>
      )}
    </div>
  );
}