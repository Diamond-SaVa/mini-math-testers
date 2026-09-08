import React from "react";


class GameMessage extends React.Component {

    constructor(props) {
        super(props);
        
        const {message, isRightOrWrong} = this.props;
        
        this.state = {
            hasMounted: false,
            textMessage: message,
            rightOrWrong: isRightOrWrong
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
        const {hasMounted, rightOrWrong, textMessage} = this.state;
        
        const slideClass =
            hasMounted && this.props.canRise
                ? "appear"
                : "";
        
        const getAnswerResult = rightOrWrong ? "isRight" : "isWrong";
        
        return (
            <div className={`game-message ${getAnswerResult} ${slideClass}`}>
                <p> {textMessage} </p>
            </div>
        );
    }
} export default GameMessage;