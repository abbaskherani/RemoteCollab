import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { Camera, CameraOff, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';

const VideoChat: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<Peer.Instance | null>(null);
  const [connectionLink, setConnectionLink] = useState<string>('');
  const [incomingSignal, setIncomingSignal] = useState<string>('');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing media devices:', err);
      }
    };

    initLocalStream();

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const signal = urlParams.get('signal');
    if (signal) {
      setIncomingSignal(decodeURIComponent(signal));
    }
  }, []);

  const createPeer = (initiator: boolean) => {
    if (!localStream) return;

    // Ensure Peer is only used in browser environment
    if (typeof window !== 'undefined') {
      const newPeer = new Peer({
        initiator,
        trickle: false,
        stream: localStream,
      });

      newPeer.on('signal', (data) => {
        const signalData = JSON.stringify(data);
        const link = `${window.location.href}?signal=${encodeURIComponent(signalData)}`;
        setConnectionLink(link);
      });

      newPeer.on('stream', (stream) => {
        setRemoteStream(stream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      });

      setPeer(newPeer);
    }
  };

  const startCall = () => {
    createPeer(true);
  };

  const answerCall = () => {
    if (!incomingSignal) return;
    createPeer(false);
    if (peer) {
      peer.signal(JSON.parse(incomingSignal));
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const endCall = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    setRemoteStream(null);
    setConnectionLink('');
    setIncomingSignal('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2 relative">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-auto border-2 border-blue-500 rounded-lg"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              You
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            {remoteStream ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-auto border-2 border-green-500 rounded-lg"
              />
            ) : (
              <div className="w-full h-0 pb-[56.25%] bg-gray-200 border-2 border-green-500 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Waiting for connection...</span>
              </div>
            )}
            {remoteStream && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                Remote User
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full ${isAudioEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'}`}
            title={isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {isAudioEnabled ? <Mic className="text-white" /> : <MicOff className="text-white" />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-2 rounded-full ${isVideoEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'}`}
            title={isVideoEnabled ? 'Turn Off Video' : 'Turn On Video'}
          >
            {isVideoEnabled ? <Camera className="text-white" /> : <CameraOff className="text-white" />}
          </button>
          {!peer ? (
            <>
              <button
                onClick={startCall}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                disabled={!!incomingSignal}
              >
                <Phone className="mr-2" /> Start Call
              </button>
              <button
                onClick={answerCall}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                disabled={!incomingSignal}
              >
                <Phone className="mr-2" /> Answer Call
              </button>
            </>
          ) : (
            <button
              onClick={endCall}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
            >
              <PhoneOff className="mr-2" /> End Call
            </button>
          )}
        </div>
        {connectionLink && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <p className="mb-2 font-semibold">Share this link with the person you want to call:</p>
            <input
              type="text"
              value={connectionLink}
              readOnly
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChat;