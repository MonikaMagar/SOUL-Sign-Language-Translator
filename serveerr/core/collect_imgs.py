import os
import cv2

DATA_DIR = './data'
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

number_of_classes = 26
dataset_size = 100

# Initialize camera - start with index 0
cap = cv2.VideoCapture(0)  # Changed from 2 to 0

# Verify camera
if not cap.isOpened():
    print("ERROR: Could not open camera. Try:")
    print("1. Change camera index to 0 or 1")
    print("2. Check if another app is using the camera")
    exit()

for j in range(number_of_classes):
    class_dir = os.path.join(DATA_DIR, str(j))
    if not os.path.exists(class_dir):
        os.makedirs(class_dir)

    print('Collecting data for class {}'.format(j))

    # Ready prompt
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Warning: Couldn't get camera frame")
            continue
            
        cv2.putText(frame, 'Ready? Press "Q" ! :)', (100, 50), 
                   cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)
        cv2.imshow('frame', frame)
        if cv2.waitKey(25) == ord('q'):
            break

    # Capture images
    counter = 0
    while counter < dataset_size:
        ret, frame = cap.read()
        if not ret:
            print("Warning: Couldn't get camera frame")
            continue
            
        cv2.imshow('frame', frame)
        cv2.waitKey(25)
        cv2.imwrite(os.path.join(class_dir, '{}.jpg'.format(counter)), frame)
        print(f"Captured image {counter+1}/{dataset_size}", end='\r')
        counter += 1

cap.release()
cv2.destroyAllWindows()
print("\nDone capturing images!")