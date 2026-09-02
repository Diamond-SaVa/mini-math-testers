import React from "react";
import './countdown-timer.css'

class CountdownTimer extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
            // Sets the timer seconds to what the initialSeconds label would be assigned.
            // If not assigned, the timer will default to 60 seconds.
            timerSeconds: this.props.initialSeconds ?? 60
        };
        // Reference pointer for the interval timer
        this.componentTimer = null;
    }

    handleTimerIncreaseComponent = (event) => {
        event.preventDefault();

        if (this.componentTimer) {
            clearInterval(this.componentTimer);
        }

        this.setState(prevState => ({
            timerSeconds: Math.min(Math.max(prevState.timerSeconds + 5, 0), 60)
        }));

        this.componentTimer = setInterval(() => {
            this.secondDown();
        }, 1000);
    }

    // Function ticking down the timer each second.
    secondDown() {
        if (this.state.timerSeconds > 0) {
            this.setState((prevState) => ({
                timerSeconds: prevState.timerSeconds - 1
            }));
        } 
        else
        {
            this.deactivateTimer()

            this.props.onTimerEnd({
                bStopGame: true
            });
        }
    }
    
    activateTimer() {
        this.componentTimer = setInterval(() => {
            this.secondDown();
        }, 1000);

        this.props.onTimerEnd({
            bStopGame: false
        });
    }

    activateTimer(newInterval = 1000) {
        this.componentTimer = setInterval(() => {
            this.secondDown();
        }, newInterval);
    }
    
    deactivateTimer() {
        if (this.componentTimer) {
            clearInterval(this.componentTimer);
        }
    }
    
    componentDidMount() {
        this.activateTimer();
    }

    componentWillUnmount() {
        this.deactivateTimer();
    }

    componentDidUpdate(prevProps) {
        if (this.props.solvedProblems !== prevProps.solvedProblems) {
            this.deactivateTimer();
            
            this.setState(prevState => ({
                timerSeconds: Math.min(Math.max(prevState.timerSeconds + 5, 0), 60) 
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
        
        return (
            <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '2rem' }}>
                {timerSeconds > 0 ? (
                    <div>
                        <h3>Time Remaining</h3>
                        <div>{this.formatTime(timerSeconds)}</div>
                        <br/>
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
                        🎉 Time's Up!
                    </div>
                )}
                <br />
                <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '2rem' }}>
                    <button type="submit" className="counter" onClick={this.handleTimerIncreaseComponent}>
                        COUNT UP
                    </button>
                </div>
            </div>
        );
    }
} export default CountdownTimer;