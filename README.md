# Imposter Game (Customized)

A social deduction party game where players pass a device to learn their secret role. One (or more) players are the **Imposter**, while the rest are **Civilians** who know the secret word. The goal is to find the imposter(s) or for the imposter to blend in!

This repository contains two versions of the game:
1.  **Web Application** (Recommended, Modern, Mobile-Friendly)
2.  **Desktop Application** (Python/Tkinter)

---

## 🌐 Web App Version (React + Vite)
A modern, responsive web application designed for mobile devices. Perfect for passing a phone around the room.

### **Features**
*   ✨ **Premium Design**: Modern "Glassmorphism" UI with dark mode aesthetics.
*   📱 **Mobile-Optimized**: Responsive layout with touch-friendly controls ("Hold to Reveal").
*   💾 **Auto-Save & Resume**: Game state and setup are automatically saved. Refreshing the specific page won't lose your progress.
*   🔄 **Categories or Custom**: Play with pre-loaded categories (Movies, Food, etc.) or enter your own custom words.
*   🎨 **Interactive & Safe**:
    *   **Reset Data**: dedicated button to wipe all saved data if needed.
    *   **Skip Round**: option to skip the current word/round if needed.
    *   **Home Button**: mid-game exit option.
*   🎲 **Randomized Start**: The starting player is shuffled every game for fairness.

### **How to Run**
1.  Navigate to the web app folder:
    ```bash
    cd web-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the local server:
    ```bash
    npm run dev
    ```
4.  Open the link shown (usually `http://localhost:5173`) on your device.

---

## 🐍 Desktop Version (Python)
The original prototype built with Python and Tkinter.

### **Requirements**
*   Python 3.x
*   `tkinter` (usually included with Python)

### **How to Run**
1.  Run the script directly:
    ```bash
    python ImposterGame.py
    ```

---

## 🎮 How to Play
1.  **Setup**: Enter player names and add a list of "Secret Words" (plus hints for the imposter).
2.  **Pass the Device**: The game will tell you who to pass the device to.
3.  **Reveal Role**:
    *   **Civilian**: You see the **Secret Word**.
    *   **Imposter**: You see "YOU ARE THE IMPOSTER" and a **Hint** (related to the word, but not the word itself).
4.  **Discuss**: Once everyone knows their role, ask questions to figure out who doesn't know the word!
5.  **Vote**: Decide who the imposter is.
