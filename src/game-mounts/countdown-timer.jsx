import React from "react";
import './countdown-timer.css'
import gameOverSound from "./assets/gameOver_V2.wav"
import { playLocalSound } from "../utilities/audio-utils.js";

class CountdownTimer extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
            // Sets the timer seconds to what the initialSeconds label would be assigned.
            // If not assigned, the timer will default to 60 seconds.
            timerSeconds: this.props.initialSeconds ?? 60,
            hasMounted: false
        };
        // Reference pointer for the interval timer
        this.componentTimer = null;
    }

    componentDidMount() {
        requestAnimationFrame(
            () =>
            {
                this.setState({
                    hasMounted: true
                }, () => {
                    // 
                    console.log("Mounting Started")
                })
            }
        );

        this.activateTimer();
    }

    handleTimerIncreaseComponent = (event) => {
        event.preventDefault();

        this.deactivateTimer();
        
        const {solvedProblems} = this.props;

        const difficulty = Math.floor(solvedProblems / 10);

        this.setState(prevState => ({
            timerSeconds: Math.min(
                Math.max(
                    prevState.timerSeconds + (5 + difficulty), 0
                ), 60
            )
        }),
            () =>
            {
                this.activateTimer();
            });
    }

    // Function ticking down the timer each second.
    secondDown() {
        this.setState(prevState => {
            const {solvedProblems} = this.props;
            
            const difficulty = Math.floor(solvedProblems / 10);
            
            const down = difficulty + 1;  
            
            const newTime = prevState.timerSeconds - down;

            return {
                timerSeconds: Math.max(newTime, -1)
            };
        }, () => {
            const {timerSeconds} = this.state;
            
            if (timerSeconds < 0) {
                this.deactivateTimer();

                this.props.onGameStateChange({
                    bStopGame: true
                });
                
                playLocalSound(gameOverSound);
            }
        });
    }

    activateTimer(newInterval = 1000) {
        this.componentTimer = setInterval(() => {
            this.secondDown();
        }, newInterval);

        this.props.onGameStateChange({
            bStopGame: false
        });
    }
    
    deactivateTimer() {
        if (this.componentTimer) {
            clearInterval(this.componentTimer);
        }
    }

    componentWillUnmount() {
        this.deactivateTimer();
    }

    componentDidUpdate(prevProps) {
        function clamp(val, min, max) {
            return Math.min(Math.max(val, min), max);
        }
        
        const { solvedProblems: newSolvedProblems } = this.props;
        
        const { solvedProblems: prevSolvedProblems } = prevProps;

        if (newSolvedProblems > prevSolvedProblems) {
            this.deactivateTimer();

            const difficulty = 
                clamp (
                    Math.floor(newSolvedProblems / 10),
                    0, 2
                );

            this.setState(prevState => ({
                timerSeconds: Math.min(
                    Math.max(
                        prevState.timerSeconds + (5 + difficulty),
                        0), 60
                )
            }), () => {
                this.activateTimer();
            });
        }
    }

    formatTime(timerSeconds) {
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;

        // Add leading zero padding
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0');

        return `${paddedMinutes}:${paddedSeconds}`;
    }
    
    render() {
        const { timerSeconds, hasMounted } = this.state;
        
        const  progressPercentage = (timerSeconds / 60) * 100;
        
        const { pleaseExit } = this.props;

        const slideClass =
            hasMounted && !pleaseExit
                ? "slide-active"
                : "slide-inactive";
        
        return (
            <div className={`slide-from-left ${slideClass}`} style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '2rem' }}>
                {timerSeconds >= 0 ? (
                    <div>
                        <h5>Time Gauge</h5>
                        <h5>{timerSeconds}</h5>
                        <div id="progress-bg" role="progressbar" aria-valuenow={progressPercentage}
                             aria-valuemin="0" aria-valuemax="100">
                            <div
                                id="progress-fill"
                                style={{ width: `${progressPercentage}%` }}
                            >
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ color: 'red', fontWeight: 'bold' }}>
                        <br/>
                        <p>🎉 Time's Up!</p>
                    </div>
                )}
            </div>
        );
    }
} export default CountdownTimer;