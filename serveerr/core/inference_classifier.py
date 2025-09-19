import pickle
import cv2
import mediapipe as mp
import numpy as np

# Load model
model_dict = pickle.load(open('./core/model.p', 'rb'))
model = model_dict['model']

# Initialize camera
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Could not open camera")
    exit()

# MediaPipe setup (SINGLE HAND version)
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=True,
    max_num_hands=1,  # Only detect one hand
    min_detection_confidence=0.5
)
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

# Your existing labels dictionary
labels_dict = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 
               8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 
               15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 
               22: 'W', 23: 'X', 24: 'Y', 25: 'Z', 26: '1', 27: '2', 28: '3', 
               29: '4', 30: '5', 31: '6', 32: '7', 33: '8', 34: '9', 35: '10', 
               36: 'Hello', 37: 'I Love You', 38: 'Yes', 39: 'Please', 
               40: 'Be quite', 41: 'Call me', 42: 'I am Deaf', 43: 'Good', 
               44: "Let's play", 45: 'Respect', 46: 'Smart', 
               47: 'Sorry', 48: 'Thank You', 49: 'Eat', 50: 'You are welcome'}

def run_detection(callback=None, translator=None):
    # Create translation window
    cv2.namedWindow('Marathi Translation', cv2.WINDOW_NORMAL)
    cv2.resizeWindow('Marathi Translation', 400, 200)  # Width, Height
    
    while True:
        # Read frame
        ret, frame = cap.read()
        if not ret:
            print("Warning: Couldn't get frame")
            continue
        
        # Process frame
        H, W = frame.shape[:2]
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Hand detection
        results = hands.process(frame_rgb)
        
        if results.multi_hand_landmarks:
            hand_landmarks = results.multi_hand_landmarks[0]  # Only take first hand
            data_aux = []
            x_ = []
            y_ = []
            
            # Draw landmarks (green color)
            mp_drawing.draw_landmarks(
                frame,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style())
            
            # Collect landmarks
            for lm in hand_landmarks.landmark:
                x_.append(lm.x)
                y_.append(lm.y)
            
            # Normalize coordinates
            for lm in hand_landmarks.landmark:
                data_aux.append(lm.x - min(x_))
                data_aux.append(lm.y - min(y_))
            
            # Prediction
            try:
                prediction = model.predict([np.asarray(data_aux)])
                predicted_char = labels_dict[int(prediction[0])]
                
                # Call callback with the predicted character
                if callback:
                    callback(predicted_char)
                
                # Draw bounding box (green)
                x1 = int(min(x_) * W) - 10
                y1 = int(min(y_) * H) - 10
                x2 = int(max(x_) * W) + 10
                y2 = int(max(y_) * H) + 10
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 4)
                cv2.putText(frame, predicted_char, (x1, y1 - 10), 
                           cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)
                
                # Create translation display when in Marathi mode
                if translator and translator.language == 'marathi':
                    translation_text = translator.translate(predicted_char)
                    
                    # Create a black image for the translation window
                    translation_display = np.zeros((200, 400, 3), dtype=np.uint8)
                    
                    # Add text to the translation window
                    cv2.putText(translation_display, f"English: {predicted_char}", 
                               (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
                    cv2.putText(translation_display, f"Marathi: {translation_text}", 
                               (20, 120), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 255), 3)
                    
                    # Show the translation window
                    cv2.imshow('Marathi Translation', translation_display)
                else:
                    # Hide translation window when in English mode
                    cv2.destroyWindow('Marathi Translation')
            
            except Exception as e:
                print(f"Prediction error: {e}")

        # Language toggle check
        key = cv2.waitKey(1)
        if key == ord('m') and translator:  # Only if translator exists
            translator.language = 'marathi' if translator.language == 'english' else 'english'
            print(f"\nLanguage switched to {translator.language.upper()}")
        
        # Display main camera window
        cv2.imshow('Sign Language Detection', frame)
        
        # Exit on ESC
        if key == 27:
            break
    
    # Cleanup
    cap.release()
    cv2.destroyAllWindows()