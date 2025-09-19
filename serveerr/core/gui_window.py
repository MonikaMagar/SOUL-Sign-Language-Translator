import tkinter as tk

class SignLanguageWindow:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Sign Language Translator")
        
        self.text_var = tk.StringVar()
        self.text_var.set("Waiting for detection...")
        
        self.label = tk.Label(
            self.root, 
            textvariable=self.text_var,
            font=("Arial", 24),
            padx=20,
            pady=20
        )
        self.label.pack()
        
        self.root.update()
    
    def update_text(self, new_text):
        self.text_var.set(new_text)
        self.root.update()
    
    def destroy(self):
        self.root.destroy()