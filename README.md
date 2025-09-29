#  Nim AI Web App

An interactive, AI-powered implementation of the **Nim game** built as a **full-stack web app**. The project merges **mathematical game theory, reinforcement learning (Q-learning), and web technologies (React + Python)** to create a visually appealing and intellectually challenging experience.

This project is inspired by **Harvard’s CS50 AI Nim assignment** but goes far beyond the console by offering:

*  A **Q-learning AI agent** that learns optimal strategies through self-play.
*  A **modern user interface** with responsive design, thematic consistency, and game HUD elements.
*  **Backend–Frontend integration** to support human vs AI gameplay seamlessly.

> **Goal:** Build a real-world, portfolio-ready game that demonstrates knowledge of **algorithms, AI, and frontend development**.

---

##  Table of Contents

1. [About the Project](#-about-the-project)
2. [Why Nim?](#-why-nim)
3. [How the Game Works](#-how-the-game-works)
4. [AI & Q-Learning Explained](#-ai--q-learning-explained)
5. [Features](#-features)
6. [Tech Stack](#-tech-stack)
7. [Project Structure](#-project-structure)
8. [Installation & Setup](#-installation--setup)
9. [How to Play](#-how-to-play)
10. [Game Interface Design](#-game-interface-design)
11. [Future Improvements](#-future-improvements)
12. [Lessons Learned](#-lessons-learned)
13. [References](#-references)
14. [License](#-license)

---

##  About the Project

Nim is a well-known **strategy game** with simple rules but deep mathematical underpinnings. The challenge lies in determining the winning strategy and predicting the opponent’s moves.

In this project, the Nim game is implemented in two layers:

1. **Core Game Engine (Python):** Implements rules, game states, and Q-learning AI.
2. **Web App Interface (React + Tailwind + Framer Motion):** Provides a polished, user-friendly experience for playing against the AI.

This combination allows the project to demonstrate both **backend problem-solving (algorithms, AI)** and **frontend design (user experience, interactivity)**.

---

##  Why Nim?

Nim is not just a toy game; it’s a gateway to understanding **game theory** and **reinforcement learning**.

* It’s a **zero-sum game**: one player’s gain is the other’s loss.
* It involves **perfect information**: all moves and states are visible.
* The winning strategy can be derived using **binary XOR (Nim-sum)**, but the AI learns it through trial and error instead.

This makes Nim an excellent teaching tool for:

* **Q-learning algorithms**
* **Exploration vs exploitation trade-offs**
* **Practical applications of reinforcement learning**

---

## 🕹️ How the Game Works

* The game starts with **4 piles of objects** (default: `[1, 3, 5, 7]`).
* Players alternate turns.
* On a turn, a player must remove **at least one object** from a **single pile**.
* The player who takes the **last object loses** (misère play).

---

##  AI & Q-Learning Explained

The AI uses **Q-learning**, a reinforcement learning technique where the agent learns optimal moves by trial and error.

* **States:** Represented by the number of items in each pile (e.g., `(1, 3, 5, 7)`).
* **Actions:** Represented by `(pile_index, count)` meaning “remove `count` from pile `i`.”
* **Q-values:** Stored in a dictionary mapping `(state, action)` pairs to a numerical score.
* **Rewards:**

  * `+1` if the AI eventually wins.
  * `-1` if the AI eventually loses.
  * `0` for intermediate moves.

### Bellman Equation Update

For each move:

```
Q(s, a) ← Q(s, a) + α [r + max(Q(s’, a’)) – Q(s, a)]
```

Where:

* `s`: current state
* `a`: action taken
* `s’`: resulting state
* `r`: reward
* `α`: learning rate

Through thousands of self-play games, the AI **discovers the optimal strategy**.

---

##  Features

*  **Training AI**: AI trains itself via Q-learning, improving with experience.
*  **Human vs AI Gameplay**: Play directly in the browser, not just console.
*  **HUD Elements**: Piles, current turn, move history, and winner status.
*  **Interactive Controls**: Click/tap piles and numbers for easy moves.
*  **Menus**: Title screen, game settings, restart options.
*  **Responsive Design**: Works on desktop, tablet, and mobile.
*  **Animations**: Smooth transitions using Framer Motion.
*  **Thematic Consistency**: Dark UI, neon highlights for a modern look.

---

## 🛠️ Tech Stack

* **Backend**: Python, Q-learning logic, optional FastAPI/Flask for serving AI
* **Frontend**: React, Tailwind CSS, Framer Motion
* **Version Control**: Git + GitHub
* **Optional Deployment**: Vercel (frontend), Render/Heroku (backend)

---

##  Project Structure

```bash
nim-ai-web/
├── backend/
│   ├── nim.py         # Game + Q-learning AI logic
│   ├── play.py        # Training and console play
│   └── server.py      # Flask/FastAPI server to connect AI to frontend
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx    # Main app component
│   │   ├── components/
│   │   │   ├── GameBoard.jsx
│   │   │   ├── HUD.jsx
│   │   │   └── Menu.jsx
│   │   └── styles/
│   ├── public/
│   └── package.json
│
├── requirements.txt
├── README.md
└── LICENSE
```

---

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/wayne540/nim-ai-web.git
cd nim-ai-web
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python play.py
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open  `http://localhost:5173`

---

##  How to Play

1. Launch the app.
2. Click **Start Game** from the menu.
3. Choose a **pile** and number of items.
4. Watch the **AI respond** instantly.
5. Game ends when all piles are empty.
6. Restart anytime from the **Settings menu**.

---

##  Game Interface Design

The design is guided by **game UI principles**:

* **Non-Diegetic UI:** Displays turn order, move count, and winner info.
* **HUD (Heads-Up Display):** Overlay showing current piles, interactive buttons.
* **Menus:** Start, Settings, Restart, Exit.
* **Mobile-Friendly Controls:** Touch gestures for pile selection.
* **Thematic Consistency:** Dark neon theme aligning with “cyber strategy” vibe.

---

##  Future Improvements

* Multiplayer Mode (human vs human online)
* Difficulty levels (easy, medium, hard)
* Persistent AI training save/load
* Leaderboard system
* Sound effects and music
* Animated pile removals

---

##  Lessons Learned

1. **Reinforcement Learning:** Implementing Q-learning deepened understanding of state-action spaces, reward functions, and exploration policies.
2. **Game Design:** Translating a console game into a graphical web app highlighted the importance of UI/UX.
3. **Full-Stack Skills:** Managing both Python backend logic and React frontend improved integration skills.
4. **Deployment Challenges:** Hosting a Python AI backend alongside a React frontend requires careful planning of APIs.

---

##  References

* [Harvard CS50 AI Nim Project](https://cs50.harvard.edu/ai/)
* [Reinforcement Learning: Sutton & Barto](http://incompleteideas.net/book/the-book.html)
* [Framer Motion Docs](https://www.framer.com/motion/)
* [Tailwind CSS](https://tailwindcss.com/)

---

##  License

This project is licensed under the **MIT License** – free to use, modify, and distribute.

