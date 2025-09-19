

from flask import Flask, Response, jsonify, request, send_file
from flask_cors import CORS
import pickle
import cv2
import mediapipe as mp
import numpy as np
import os
from modules.translation_manager import Translator
from gtts import gTTS

# Load model
model_dict = pickle.load(open('./core/model.p', 'rb'))
model = model_dict['model']

app = Flask(__name__)
CORS(app)

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Could not open camera")
    exit()

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

labels_dict = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H',
    8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O',
    15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V',
    22: 'W', 23: 'X', 24: 'Y', 25: 'Z', 26: '1', 27: '2', 28: '3',
    29: '4', 30: '5', 31: '6', 32: '7', 33: '8', 34: '9', 35: '10',
    36: 'Hello', 37: 'I Love You', 38: 'Yes', 39: 'Please',
    40: 'Be quiet', 41: 'Call me', 42: 'I am Deaf', 43: 'Good',
    44: "Let's play", 45: 'Respect', 46: 'Smart',
    47: 'Sorry', 48: 'Thank You', 49: 'Eat', 50: 'You are welcome'
}

translator = Translator()
translator.language = 'marathi'

latest_detected_word = ""

SIGN_IMAGES_DIR = "sign_images"

def generate_frames():
    global latest_detected_word
    while True:
        success, frame = cap.read()
        if not success:
            break
        
        H, W, _ = frame.shape
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)

        if results.multi_hand_landmarks:
            hand_landmarks = results.multi_hand_landmarks[0]
            data_aux = []
            x_ = []
            y_ = []

            for lm in hand_landmarks.landmark:
                x_.append(lm.x)
                y_.append(lm.y)

            for lm in hand_landmarks.landmark:
                data_aux.append(lm.x - min(x_))
                data_aux.append(lm.y - min(y_))

            try:
                prediction = model.predict([np.asarray(data_aux)])
                predicted_char = labels_dict[int(prediction[0])]
                latest_detected_word = predicted_char

                x1 = int(min(x_) * W) - 10
                y1 = int(min(y_) * H) - 10
                x2 = int(max(x_) * W) + 10
                y2 = int(max(y_) * H) + 10

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 4)
                cv2.putText(frame, predicted_char, (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)

            except Exception as e:
                print(f"Prediction error: {e}")

            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video')
def video():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/detected_word')
def detected_word():
    return jsonify({"word": latest_detected_word})

@app.route('/translate', methods=['GET'])
def translate():
    word = request.args.get('word', '')
    if not word:
        return jsonify({"error": "No word provided for translation"}), 400

    translated_word = translator.translate(word)
    return jsonify({"original": word, "translated": translated_word})

@app.route('/sign_images/<filename>')
def get_sign_image(filename):
    image_path = os.path.join(SIGN_IMAGES_DIR, filename)
    if os.path.exists(image_path):
        return send_file(image_path, mimetype='image/png')
    else:
        return jsonify({"error": "Image not found"}), 404

@app.route('/speak', methods=['GET'])
def speak():
    text = request.args.get('text', '')
    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        tts = gTTS(text=text, lang='en')
        audio_path = "temp_audio.mp3"
        tts.save(audio_path)

        return send_file(audio_path, mimetype='audio/mpeg')
    except Exception as e:
        return jsonify({"error": f"Speech generation failed: {e}"}), 500

@app.route('/')
def index():
    return "Sign Language Detection Flask Backend Running!"

if __name__ == '__main__':
    app.run(debug=True)
