import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import CountdownTimer from "./game-mounts/countdown-timer.jsx";
import MathMiniGame from "./game-mounts/math-mini-game.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [timeBonus, setTimeBonus] = useState(0);

    const handleTimerIncrease = (data) => {
        console.log('Received data from child form : ', data);
    };
  
    const handleAnswerCompare = (data) => {
        const isCorrect = data.value === data.rightAnswer;

        const newMessage = isCorrect ? "CORRECT!" : "WRONG!";
        
        setMessage(newMessage)

        if (isCorrect) {
            setTimeBonus(prev => prev + 1);
        }
    };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Mini Math Testers!</h1>
          <p>
            <code>Proof of Concept and React Development Learning</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
        >
            {message}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
          <CountdownTimer
              initialSeconds={30}
              timeBonus={timeBonus}
          />
          <MathMiniGame 
              onSubmitData={handleAnswerCompare}
              timeBonus={timeBonus}/>
      </section>

      <div className="ticks"></div>
      <section id="spacer">
      </section>
    </>
  )
}

export default App
