import {useEffect, useState} from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import gameLogo from './assets/Mini-Logo.svg'
import './App.css'
import CountdownTimer from "./game-mounts/countdown-timer.jsx";
import MathMiniGame from "./game-mounts/math-mini-game.jsx";
import ScoreCounter from "./game-mounts/score-counter.jsx";

function App() {
    useEffect(() => {
        console.log('Component has mounted!'); // Runs once on mount
        
        setHasMounted(true);

        return () => {
            console.log('Component will unmount!'); // Optional cleanup on unmount
        };
    }, []);
    
    // Added boolean to set game over to
    const [hasMounted, setHasMounted] = useState(false);
    const [gameStart, setGameStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [menuIsActive, setMenuIsActive] = useState(true);
    const [message, setMessage] = useState('Your answer is...');
    const [solvedProblems, setSolvedProblems] = useState(0);
    const [solvedProblemsRecord, setSolvedProblemRecord] = useState(0);

    const initiateTimerForMenuOut = () => {
        setTimeout(() => {
            setMenuIsActive(false);
        }, 1100);
    };

    const initiateTimerForMenuIn = () => {
        setTimeout(() => {
            setMenuIsActive(true);
            setGameStart(false);
            setGameOver(false);
        }, 1100);
    };
    
    const compareNewRecord = () =>
    {
        if (solvedProblems > solvedProblemsRecord)
        {
            setSolvedProblemRecord(solvedProblems);
        }
    }
  
    const handleAnswerCompare = (data) => {
        const isCorrect = data.value === data.rightAnswer;

        const newMessage = isCorrect ? "CORRECT!" : "WRONG!";
        
        setMessage(newMessage)

        if (isCorrect) {
            const newSolvedProblems = solvedProblems + 1;

            setSolvedProblems(newSolvedProblems);

            if (newSolvedProblems > solvedProblemsRecord) {
                setSolvedProblemRecord(newSolvedProblems);
            }
        }
    };

    // So far, the game successfully makes the boolean turn true, but I am not sure if it turns it back to false
    const handleGameStateChange = (data) => {
        setGameOver(data.bStopGame);
        
        if (data.bStopGame)
        {
            initiateTimerForMenuIn();
            
            setSolvedProblems(0);
        }
    }

    const slideClassBeforeGameStart =
        hasMounted && !gameStart
            ? "slide-active"
            : "slide-inactive";

  return (
    <>
        { menuIsActive ? (
            <section id="center" className={`main-menu slide-vertical ${slideClassBeforeGameStart}`}>
                <div className="hero">
                    <img src={gameLogo} className="base" width="170" height="179" alt="" />
                </div>
                <div>
                    <h1>Mini Math Testers!</h1>
                    <p>
                        <code>Proof of Concept and React Development Learning</code>
                    </p>
                    <br/>
                    <p>
                        <code>Current Record of Solved Problems : {solvedProblemsRecord} </code>
                    </p>
                </div>
                <button
                    type="button"
                    className="counter"
                    onClick={() => {
                        initiateTimerForMenuOut();

                        setGameStart(true);
                    }}
                >
                    START THE GAME
                </button>
            </section>
        ) :
            null
        }

        { gameStart && !menuIsActive ? (
            <>
                <ScoreCounter
                    message = {message}
                    solvedProblems = {solvedProblems}
                    gameStart={!gameOver}
                />
                <section className="game-components" id="next-steps">
                    <CountdownTimer
                        initialSeconds={5}
                        solvedProblems={solvedProblems}
                        onGameStateChange= {handleGameStateChange}
                        gameStart={!gameOver}
                    />
                    <MathMiniGame
                        onSubmitData={handleAnswerCompare}
                        solvedProblems={solvedProblems}
                        gameStart={!gameOver}
                    />
                </section>
            </>
        ) : null }
        <div className="ticks"></div>
        <section id="spacer">
        </section>
        
    </>
  )
}

export default App
