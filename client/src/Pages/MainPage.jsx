import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaVolumeUp } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import "../Pages/MainPage.css"
import NavigationBar from "../Pages/Navbar";

function MainPage() {
  const [detectedWord, setDetectedWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");
  const [inputText, setInputText] = useState("");
  const [signImages, setSignImages] = useState([]);
  const [language, setLanguage] = useState("english");
  const audioRef = React.useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:5000/detected_word")
        .then((response) => setDetectedWord(response.data.word))
        .catch((error) =>
          console.error("Error fetching detected word:", error)
        );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (detectedWord) translateWord(detectedWord);
  }, [detectedWord]);

  const translateWord = (word) => {
    axios
      .get(`http://localhost:5000/translate?word=${encodeURIComponent(word)}`)
      .then((response) => setTranslatedWord(response.data.translated))
      .catch((error) => console.error("Error translating word:", error));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "english" ? "marathi" : "english"));
  };

  const handleSpeak = () => {
    const wordToSpeak = language === "english" ? detectedWord : translatedWord;
    if (wordToSpeak) {
      const audioUrl = `http://localhost:5000/speak?text=${encodeURIComponent(
        wordToSpeak
      )}`;
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch((error) =>
          console.error("Audio play failed:", error)
        );
      }
    }
  };



  const commonPhrases = [
    "be quiet", "call me", "eat", "good", "hello", "i am deaf", "i love you",
    "let's play", "respect", "thank you", "yes", "you are welcome",
    "please", "sorry", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
  ];
  
  const handleShowSigns = () => {
    const text = inputText.toLowerCase().trim();
  
    if (text !== "") {
      let images = [];
  
      if (commonPhrases.includes(text)) {
        // Phrase match: use phrase image
        const filename = text.replaceAll(" ", "_") + ".png";
        images.push(`http://localhost:5000/sign_images/${filename}`);
      } else {
        // Otherwise, split into individual characters
        const chars = text.split("");
        const validChars = chars.filter((char) => /[a-z0-9]/.test(char));
        images = validChars.map(
          (char) => `http://localhost:5000/sign_images/${char}.png`
        );
      }
  
      setSignImages(images);
    }
  };
  

  const displayWord = language === "english" ? detectedWord : translatedWord;

  return (
    
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
       
        marginTop:"4rem",
        background: "black",
        fontFamily: "Arial",
      }}
    >
        

        <NavigationBar />

      <div className="container">
        <div className="row d-flex align-items-stretch">
          {/* Left Section */}
          <div className="col-md-6 col-lg-6 mb-4">
            <div
              style={{
                padding: "20px",
                border: "2px solid #4b5563",
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <h2>Sign Language Live Stream</h2>
              <img
                src="http://localhost:5000/video"
                alt="Live Stream"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "300px",
                  border: "2px solid black",
                  marginBottom: "20px",
                }}
              />
              <h3>Detected Word: {displayWord || "-"}</h3>
              <div className="d-flex justify-content-between">
                {/* Switch Language Button */}
                <button
                  onClick={toggleLanguage}
                  className="btn btn-purple"
                  style={{
                    width: "48%",
                    fontSize: "16px",
                    padding: "10px",
                  }}
                >
                  <MdLanguage style={{ marginRight: "8px" }} />
                  {language === "english"
                    ? "Switch to Marathi"
                    : "Switch to English"}
                </button>

                {/* Speak Button */}
                <button
                  onClick={handleSpeak}
                  className="btn btn-purple"
                  style={{
                    width: "48%",
                    fontSize: "16px",
                    padding: "10px",
                  }}
                >
                  <FaVolumeUp style={{ marginRight: "8px" }} />
                  Speak
                </button>
              </div>
              <audio ref={audioRef} />
            </div>
          </div>

          {/* Right Section */}
          <div className="col-md-6 col-lg-6 mb-4">
            <div
              style={{
                padding: "20px",
                border: "2px solid #4b5563",
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <h2>Convert Your Text to Signs</h2>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter a word or sentence"
                className="form-control mb-2"
              />

              {/* Centered Show Signs Button */}
              <button
                onClick={handleShowSigns}
                className="btn btn-purple"
                style={{
                  width: "50%",
                  margin: "0 auto",
                  padding: "10px",
                }}
              >
                Show Signs
              </button>

              {signImages.length > 0 && (
                <>
                  <h4 style={{ marginTop: "20px" }}>Sign Images:</h4>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      className:"singimg"
                    }}
                  >
                    <div className="signimg">
  {signImages.map((src, idx) => (
    <img
      key={idx}
      src={src}
      alt={`Sign ${idx}`}
      className="sign-image"
      onError={(e) => (e.target.style.display = "none")}
    />
  ))}
</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
