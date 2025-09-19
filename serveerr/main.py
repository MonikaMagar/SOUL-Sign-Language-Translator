print("✅ Script started")

import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
import os
import threading
from modules.translation_manager import Translator
from core.inference_classifier import run_detection
from modules.tts_manager import TTSEngine

class TranslationApp:
    def __init__(self):
        self.tts = TTSEngine()
        self.translator = Translator()
        self.current_language = 'english'
        
        # Main Window Setup
        self.root = tk.Tk()
        self.root.title("Sign Language Translator")
        self.root.geometry("600x700")
        self.root.protocol("WM_DELETE_WINDOW", self.on_close)
        
        # Configure styles
        self.root.configure(bg='#f0f0f0')
        font_large = ("Arial", 20)
        font_medium = ("Arial", 12)
        
        # Main Detection Display
        self.text_var = tk.StringVar()
        self.text_var.set("Perform a sign or enter text to begin...")
        
        self.display_label = tk.Label(
            self.root,
            textvariable=self.text_var,
            font=font_large,
            bg='#f0f0f0',
            wraplength=450,
            justify='center',
            height=3
        )
        self.display_label.pack(pady=10)
        
        # Language Control
        control_frame = tk.Frame(self.root, bg='#f0f0f0')
        control_frame.pack()
        
        self.toggle_btn = tk.Button(
            control_frame,
            text="मराठी मोडमध्ये बदला" if self.current_language == 'english' else "Switch to English",
            command=self.toggle_language,
            font=font_medium,
            bg='#4CAF50',
            fg='white',
            padx=15,
            pady=8
        )
        self.toggle_btn.pack(pady=5)
        
        # Text-to-Sign Components
        self.setup_text_to_sign_ui()
        
        # Status Bar
        self.status_var = tk.StringVar()
        self.status_var.set("Ready")
        status_bar = tk.Label(
            self.root,
            textvariable=self.status_var,
            bd=1,
            relief=tk.SUNKEN,
            anchor=tk.W,
            bg='#f0f0f0',
            font=("Arial", 10)
        )
        status_bar.pack(side=tk.BOTTOM, fill=tk.X)
        
        # Start detection
        self.start_detection()
    
    def setup_text_to_sign_ui(self):
        """Add UI elements for text-to-sign feature"""
        input_frame = tk.Frame(self.root, bg='#f0f0f0')
        input_frame.pack(pady=(15, 5))
        
        tk.Label(
            input_frame,
            text="Enter text to see signs:",
            bg='#f0f0f0',
            font=("Arial", 10)
        ).pack(side=tk.LEFT, padx=5)
        
        self.text_input = tk.Entry(
            input_frame,
            font=("Arial", 12),
            width=25
        )
        self.text_input.pack(side=tk.LEFT, padx=5)
        
        self.show_sign_btn = tk.Button(
            input_frame,
            text="Show Sign",
            command=self.show_sign_from_text,
            font=("Arial", 10),
            bg='#607D8B',
            fg='white'
        )
        self.show_sign_btn.pack(side=tk.LEFT)
        
        # Sign Display Area
        self.sign_frame = tk.Frame(
            self.root,
            bg='white',
            height=300,
            bd=2,
            relief=tk.GROOVE
        )
        self.sign_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=(0, 10))
        
        # Initialize sign images dictionary
        self.sign_images = self.load_sign_images()
    
    def load_sign_images(self):
        """Load sign language images from directory"""
        sign_images = {}
        image_dir = "sign_images"
        
        if not os.path.exists(image_dir):
            os.makedirs(image_dir)
            messagebox.showwarning(
                "Missing Images", 
                f"Created '{image_dir}' folder. Please add sign images"
            )
            return sign_images
        
        # Load individual letters
        for char in "abcdefghijklmnopqrstuvwxyz":
            img_path = os.path.join(image_dir, f"{char}.png")
            if os.path.exists(img_path):
                sign_images[char] = img_path
                
        # Load common phrases
        common_phrases = {
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
            "10": "10.png",
        }
        
        for phrase, filename in common_phrases.items():
            img_path = os.path.join(image_dir, filename)
            if os.path.exists(img_path):
                sign_images[phrase] = img_path
                
        return sign_images
    
    def show_sign_from_text(self):
        """Display sign language images for entered text"""
        text = self.text_input.get().strip().lower()
        if not text:
            messagebox.showwarning("Input", "Please enter some text")
            return
        
        # Clear previous signs
        for widget in self.sign_frame.winfo_children():
            widget.destroy()
        
        # Check for common phrases first
        phrase_found = False
        for phrase in self.sign_images:
            if isinstance(phrase, str) and len(phrase) > 1:  # It's a phrase, not single char
                if phrase in text:
                    try:
                        img = Image.open(self.sign_images[phrase])
                        img = img.resize((300, 300), Image.LANCZOS)
                        photo = ImageTk.PhotoImage(img)
                        
                        label = tk.Label(
                            self.sign_frame, 
                            image=photo, 
                            bg='white'
                        )
                        label.image = photo
                        label.pack(pady=20)
                        
                        tk.Label(
                            self.sign_frame, 
                            text=phrase.title(), 
                            bg='white',
                            font=("Arial", 14, "bold")
                        ).pack()
                        
                        phrase_found = True
                        break
                    except Exception as e:
                        print(f"Error loading image for {phrase}: {str(e)}")
        
        if not phrase_found:
            self.show_individual_letters(text)
        
        self.status_var.set(f"Displayed signs for: {text}")
    
    def show_individual_letters(self, text):
        """Display individual letter signs"""
        col, row = 0, 0
        max_cols = 4
        img_size = 120
        
        for char in text:
            if char == ' ':
                tk.Label(self.sign_frame, text=" ", width=5, bg='white').grid(
                    row=row, column=col
                )
                col += 1
            elif char in self.sign_images:
                try:
                    img = Image.open(self.sign_images[char])
                    img = img.resize((img_size, img_size), Image.LANCZOS)
                    photo = ImageTk.PhotoImage(img)
                    
                    label = tk.Label(
                        self.sign_frame, 
                        image=photo, 
                        bg='white'
                    )
                    label.image = photo
                    label.grid(
                        row=row, 
                        column=col, 
                        padx=5,
                        pady=5
                    )
                    
                    tk.Label(
                        self.sign_frame, 
                        text=char.upper(), 
                        bg='white',
                        font=("Arial", 12, "bold")
                    ).grid(row=row+1, column=col)
                    
                    col += 1
                    if col >= max_cols:
                        col = 0
                        row += 2
                        
                except Exception as e:
                    print(f"Error loading image for {char}: {str(e)}")
    
    def toggle_language(self):
        """Toggle between English and Marathi"""
        try:
            if self.current_language == 'english':
                self.current_language = 'marathi'
                self.toggle_btn.config(
                    text="Switch to English",
                    bg='#2196F3'
                )
                self.status_var.set("Marathi mode activated (text only)")
            else:
                self.current_language = 'english'
                self.toggle_btn.config(
                    text="मराठी मोडमध्ये बदला",
                    bg='#4CAF50'
                )
                self.status_var.set("English mode activated")
            
            self.translator.language = self.current_language
            self.text_var.set("मराठी मोडमध्ये आपले स्वागत आहे" if self.current_language == 'marathi' 
                            else "Welcome to English mode")
        except Exception as e:
            self.show_error(f"Language switch failed: {str(e)}")
    
    def on_prediction(self, predicted_char):
        """Handle new predictions with English audio only"""
        try:
            if predicted_char.strip():  # Ignore empty predictions
                if self.current_language == 'marathi':
                    translated = self.translator.translate(predicted_char)
                    self.text_var.set(translated)
                    self.status_var.set(f"Detected: {predicted_char} (Marathi text only)")
                else:
                    self.text_var.set(predicted_char)
                    self.tts.speak(predicted_char)  # English audio
                    self.status_var.set(f"Detected: {predicted_char}")
        except Exception as e:
            self.show_error(f"Prediction error: {str(e)}")
    
    def start_detection(self):
        """Start the sign language detection"""
        try:
            self.status_var.set("Starting detection...")
            detection_thread = threading.Thread(
                target=run_detection,
                kwargs={'callback': self.on_prediction},
                daemon=True
            )
            detection_thread.start()
            self.status_var.set("Detection running - Perform signs")
        except Exception as e:
            self.show_error(f"Failed to start detection: {str(e)}")
    
    def show_error(self, message):
        """Show error message"""
        messagebox.showerror("Error", message)
        self.status_var.set(f"Error: {message}")
    
    def on_close(self):
        """Handle window closing"""
        if messagebox.askokcancel("Quit", "Do you want to quit the application?"):
            self.root.destroy()
    
    def run(self):
        """Run the application"""
        self.root.mainloop()

if __name__ == "__main__":
    try:
        app = TranslationApp()
        app.run()
    except Exception as e:
        messagebox.showerror("Startup Error", f"Application failed to start: {str(e)}")

