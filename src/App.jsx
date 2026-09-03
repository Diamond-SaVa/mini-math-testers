import {useEffect, useState} from 'react'
import gameLogo from './assets/Mini-Logo.svg'
import gameLogoErase from './assets/Mini-Logo_Clean.webp'
import './App.css'
import CountdownTimer from "./game-mounts/countdown-timer.jsx";
import MathMiniGame from "./game-mounts/math-mini-game.jsx";
import ScoreCounter from "./game-mounts/score-counter.jsx";

function App() {
    // Added boolean to set game over to
    const [hasMounted, setHasMounted] = useState(false);
    const [gameStart, setGameStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [menuIsActive, setMenuIsActive] = useState(true);
    const [difficulty,setDifficulty] = useState(0);
    const [solvedProblems, setSolvedProblems] = useState(0);
    const [solvedProblemsRecord, setSolvedProblemsRecord] = useState(0);
    const [deletingState, setDeletingState] = useState(false);

    useEffect(() => {
        console.log('Component has mounted!'); // Runs once on mount
        // On start up, make the app known that it's been mounted
        setHasMounted(true);

        // Define a starting value of "0" for the highScore text
        let highScoreFromMountText = "0";

        // Only proceed if the local storage contains a value within
        if(localStorage.length > 0)
        {
            // update the text value of the high score from the localStorage
            highScoreFromMountText = localStorage.getItem("hi-score");
        }

        // Set the final value in text to a numeric high score value variable
        const highScoreValue = JSON.parse(highScoreFromMountText);

        // And set it onto the setSolvedProblemsRecord
        setSolvedProblemsRecord(highScoreValue);

        return () => {
            console.log('Component will unmount!'); // Optional cleanup on unmount
        };
    }, []);

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
  
    const handleAnswerCompare = (data) => {
        const isCorrect = data.value === data.rightAnswer;
        
        const {difficulty} = data;
        
        setDifficulty(difficulty);
        
        console.log("Updated Difficulty from handleAnswerCompare : " + difficulty.toString());

        if (isCorrect) {
            const newSolvedProblems = solvedProblems + 1;

            setSolvedProblems(newSolvedProblems);

            if (newSolvedProblems > solvedProblemsRecord) {
                setSolvedProblemsRecord(newSolvedProblems);
                
                const newSolvedProblemText = newSolvedProblems.toString();
                
                localStorage.setItem("hi-score", newSolvedProblemText);
                
                console.log("New record obtained : " + newSolvedProblemText);
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

    const deleteData = () => {
        if(localStorage.length > 0)
        {
            localStorage.removeItem("hi-score");
        }
        
        setDeletingState(true);

        setSolvedProblemsRecord(0);
        
        setTimeout(
            () =>
            {
                setDeletingState(false);
            }, 1000
        )
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
                    
                        { !deletingState ? (
                            <>
                                <p>
                                    <button
                                        type="button"
                                        className="counter"
                                        onClick={deleteData}
                                    >
                                        RESET SCORE
                                    </button>
                                </p>
                                <img src={gameLogo} className="base" alt="game logo" />
                            </>
                        ) : (<img src={gameLogoErase} className="base" alt="game logo erasing data" />)}
                    
                    {
                        !deletingState ? (
                            <label className="framework">HI-SCORE : {solvedProblemsRecord}</label>
                        ) : null
                    }
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
                    solvedProblems = {solvedProblems}
                    gameStart={!gameOver}
                />
                <CountdownTimer
                    initialSeconds={30}
                    solvedProblems={solvedProblems}
                    difficulty={difficulty}
                    onGameStateChange= {handleGameStateChange}
                    gameStart={!gameOver}
                />
                <MathMiniGame
                    onSubmitData={handleAnswerCompare}
                    solvedProblems={solvedProblems}
                    gameStart={!gameOver}
                />
            </>
        ) : null }
        <div className="ticks"></div>
        <section id="spacer">
        </section>
        
    </>
  )
}

export default App
