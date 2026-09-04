© 2026 Ricardo Sánchez Villegas. All rights reserved.
Mini Math Testers is a learning prototype created as part of my study of React and web development.

This repository is publicly available for viewing and educational reference. 
No license is granted to copy, modify, distribute, sublicense, 
or use the source code in another project except where otherwise permitted
by law or GitHub's Terms of Service.

# Mini Math Testers
## Proof of Concept
A simple but re-playable mini-game to pass the time.
Developed using React and JSX to learn and grow with React Web Development.
## Functionality and Component Communication
This is a simple mini-game working through React Components communicating with App as the "middle-man" handling the refresh of the Countdown Timer and the regeneration of new math problems.

                 App
                /   \
               /     \
              ▼       ▼
           Timer     Game

              ┌─────────────────────┐
              │       App.jsx       │
              │                     │
              │ timeBonus = 0       │
              └──────────┬──────────┘
                         │
                         │ prop
                         ▼
              ┌─────────────────────┐
              │  CountdownTimer     │
              │                     │
              │ timeBonus = 0       │
              └─────────────────────┘


