import React from "react";
import './countdown-timer.css'

class CountdownTimer extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
            // Sets the timer seconds to what the initialSeconds label would be assigned.
            // If not assigned, the timer will default to 60 seconds.
            timerSeconds: this.props.initialSeconds ?? 60,
            hasMounted: false,
            difficulty: 0
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

        const { difficulty } = this.state;

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
        if (this.state.timerSeconds >= 0) {
            const { difficulty } = this.state;
            
            this.setState((prevState) => ({
                timerSeconds: prevState.timerSeconds - (difficulty + 1)
            }));
        } 
        else
        {
            this.deactivateTimer()

            this.props.onGameStateChange({
                bStopGame: true
            });
        }
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

        if (this.props.solvedProblems !== prevProps.solvedProblems) {
            this.deactivateTimer();
            
            const { difficulty } = this.props;
            
            let newDifficulty = difficulty;
            
            if (this.props.difficulty !== prevProps.difficulty)
            {
                newDifficulty = difficulty + 1;
            }
            
            newDifficulty = clamp(newDifficulty, 0, 2);
            
            console.log("New Difficulty from Timer : " + newDifficulty.toString());
            
            this.setState(prevState => ({
                timerSeconds: Math.min(Math.max(prevState.timerSeconds + (5 + newDifficulty), 0), 60),
                difficulty: newDifficulty
            }));

            this.activateTimer();
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
        const { timerSeconds } = this.state;
        
        const  progressPercentage = (timerSeconds / 60) * 100;

        const slideClass =
            this.state.hasMounted && this.props.gameStart
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
                        <button type="submit" className="counter" onClick={this.handleTimerIncreaseComponent}>
                            COUNT UP
                        </button>
                    </div>
                ) : (
                    <div style={{ color: 'red', fontWeight: 'bold' }}>
                        🎉 Time's Up!
                    </div>
                )}
            </div>
        );
    }
} export default CountdownTimer;