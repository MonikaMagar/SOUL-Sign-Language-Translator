import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';



const phrases = {
  "be quiet": "be_quiet.png",
  "call me": "call_me.png",
  "eat": "eat.png",
  "good": "good.png",
  "hello": "hello.png",
  "i am deaf": "i_am_deaf.png",
  "i love you": "i_love_you.png",
  "let's play": "lets_play.png",
  "respect": "respect.png",
  "thank you": "thank_you.png",
  "yes": "yes.png",
  "you are welcome": "you_are_welcome.png",
  "please": "please.png",
  "sorry": "sorry.png",
  "1": "1.png",
  "2": "2.png",
  "3": "3.png",
  "4": "4.png",
  "5": "5.png",
  "6": "6.png",
  "7": "7.png",
  "8": "8.png",
  "9": "9.png",
  "10": "10.png"
};

const Home = () => {
  const [language, setLanguage] = useState('english');
  const [text, setText] = useState('');
  const [signImages, setSignImages] = useState([]);
  const [status, setStatus] = useState('Ready');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === 'english' ? 'marathi' : 'english');
    setStatus(prev => prev.includes('Marathi') ? 'English mode activated' : 'Marathi mode activated');
  };

  const handleShowSign = () => {
    const lowerText = text.toLowerCase().trim();
    const matchedPhrase = Object.keys(phrases).find(p => lowerText.includes(p));

    if (matchedPhrase) {
      setSignImages([phrases[matchedPhrase]]);
    } else {
      const images = [...lowerText].map(char => `/sign_images/${char}.png`).filter(img => img.includes('.png'));
      setSignImages(images);
    }

    setStatus(`Displayed signs for: ${text}`);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/png');
      console.log("Captured Image URL:", imageUrl);
      setStatus('Image captured!');
    }
  };

  useEffect(() => {
    const getCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setStatus("Unable to access camera.");
      }
    };

    getCamera();

    const interval = setInterval(() => {
      fetch('http://localhost:4000/predict')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          const predicted = data.prediction.toLowerCase();
          setText(predicted);
          const matched = Object.keys(phrases).find(p => predicted.includes(p));
          if (matched) {
            setSignImages([phrases[matched]]);
          } else {
            const images = [...predicted].map(char => `/sign_images/${char}.png`);
            setSignImages(images);
          }
          setStatus(`Detected: ${predicted}`);
        })
        .catch(err => {
          console.error("Error fetching prediction:", err);
          setStatus("Failed to fetch prediction. Please ensure the backend is running.");
        });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Sign Language Translator</h1>
      <div className="flex">
        <Button onClick={handleLanguageToggle} className="bg-green-600">
          {language === 'english' ? 'Switch to Marathi' : 'Switch to English'}
        </Button>
      </div>

      <Card className="card">
        <p>{language === 'english' ? 'Perform a sign or enter text to begin...' : 'सुरुवात करण्यासाठी चिन्ह करा किंवा मजकूर टाका...'}</p>
      </Card>

      <div className="flex">
        <Input 
          placeholder="Enter text to see signs" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
        <Button onClick={handleShowSign} className="bg-slate-700">Show Sign</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {signImages.map((img, idx) => (
          <img key={idx} src={`/sign_images/${img}`} alt="sign" />
        ))}
      </div>

      <div className="flex-col">
        <video ref={videoRef} autoPlay playsInline className="video" />
        <canvas ref={canvasRef} width="320" height="240" className="hidden" />
        <Button onClick={handleCapture} className="bg-blue-700">Capture Image</Button>
      </div>

      <p>{status}</p>
    </div>
  );
};

export default Home;
