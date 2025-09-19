# modules/translation_manager.py
class Translator:
    def __init__(self):
        self.language = 'english'
        self.marathi_dict = {
           # Alphabet
    'A': 'अ', 'B': 'ब', 'C': 'क', 'D': 'ड', 'E': 'ई',
    'F': 'फ', 'G': 'ग', 'H': 'ह', 'I': 'आय', 'J': 'ज',
    'K': 'क', 'L': 'ल', 'M': 'म', 'N': 'न', 'O': 'ओ',
    'P': 'प', 'Q': 'क्यू', 'R': 'र', 'S': 'स', 'T': 'ट',
    'U': 'यू', 'V': 'व्ही', 'W': 'डब्ल्यू', 'X': 'एक्स', 'Y': 'वाय', 'Z': 'झेड',
    
    # Numbers
    '1': '१', '2': '२', '3': '३', '4': '४', '5': '५',
    '6': '६', '7': '७', '8': '८', '9': '९', '10': '१०',
    
    # Phrases
    'Hello': 'नमस्कार',
    'I Love You': 'माझं तुझ्यावर प्रेम आहे',
    'Yes': 'होय',
    'Please': 'कृपया',
    'Be quite': 'शांत रहा',
    'Call me': 'मला कॉल करा',
    'I am Deaf': 'मी बधिर आहे',
    'Good': 'चांगले',
    "Let's play": 'चला खेळूया',
    'Respect': 'आदर',
    'Smart': 'हुशार',
    'Sorry': 'क्षमस्व',
    'Thank You': 'धन्यवाद',
    'Eat': 'जेवण',
    'You are welcome': 'तुमचं स्वागत आहे'

        }
    
    def translate(self, text):
        if self.language == 'marathi':
            return self.marathi_dict.get(text, text)
        return text