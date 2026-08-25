# Mini Math Testers
## Proof of Concept
A simple but re-playable mini game to pass the time.
Developed using React and JSX to learn and grow with React Web Development.
## Functionality and Component Communication
This is a simple mini game working through React Components communicating with App as the "middle-man" handling the refresh of the Countdown Timer and the regeneration of new math problems.

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


Player answers correctly
          │
          ▼
   MathMiniGame
          │
          │ callback
          ▼
       App.jsx
          │
          │ setTimeBonus(1)
          ▼
    App re-renders
          │
          │ prop changes
          ▼
   CountdownTimer
          │
          │ componentDidUpdate()
          ▼
 timerSeconds += 10
          │
          ▼
   CountdownTimer renders

## Features to Add
* Sound Cues and Visual Feedback that better notifies the player of their answers.
* Design and Think of an appropriate End Condition (Goal, Game Over, etc.)
* Gradual Difficulty Increment
* Different Game Modes 
