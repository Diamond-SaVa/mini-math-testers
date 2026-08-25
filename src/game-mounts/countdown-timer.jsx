import React from "react";

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

        this.setState(prevState => ({
            timerSeconds: prevState.timerSeconds + 10
        }));
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
            clearInterval(this.componentTimer);
        }
    }
    
    componentDidMount() {
        this.componentTimer = setInterval(() => {
            this.secondDown();
        }, 1000);
    }

    componentWillUnmount() {
        if (this.componentTimer) {
            clearInterval(this.componentTimer);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.timeBonus !== prevProps.timeBonus) {
            this.setState(prevState => ({
                timerSeconds: prevState.timerSeconds + 5
            }));
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
        
        return (
            <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '2rem' }}>
                {timerSeconds > 0 ? (
                    <div>
                        <h3>Time Remaining</h3>
                        <div>{this.formatTime(timerSeconds)}</div>
                    </div>
                ) : (
                    <div style={{ color: 'red', fontWeight: 'bold' }}>
                        🎉 Time's Up!
                    </div>
                )}
                <br />
                <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '2rem' }}>
                    <button type="submit" className="counter" onClick={this.handleTimerIncreaseComponent}>COUNT UP</button>
                </div>
            </div>
        );
    }
} export default CountdownTimer;