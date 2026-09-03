import React from "react";


class GameMessage extends React.Component {

    constructor(props) {
        super(props);

        const message = this.props.message;
        const wasRightOrWrong = this.props.isRightOrWrong
        
        this.state = {
            hasMounted: false,
            textMessage: message,
            rightOrWrong: wasRightOrWrong
        }
    }

    componentDidMount() {
        requestAnimationFrame(
            () =>
            {
                this.setState({
                    hasMounted: true
                }, () => {
                    // 
                })
            }
        );
    }
    
    componentWillUnmount() {
        this.setState({
            hasMounted: false
        }, () => {
            // 
        })
    }
    
    render() {
        const slideClass =
            this.state.hasMounted && this.props.canRise
                ? "appear"
                : "";
        
        const getAnswerResult = this.state.rightOrWrong ? "isRight" : "isWrong";
        
        return (
            <div className={`game-message ${getAnswerResult} ${slideClass}`}>
                <p> {this.state.textMessage} </p>
            </div>
        );
    }
} export default GameMessage;