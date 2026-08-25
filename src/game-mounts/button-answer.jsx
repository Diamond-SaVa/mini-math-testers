import React from "react";

class ButtonAnswer extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <button type="button"
                    className="counter answer"
                    onClick={() => this.props.onAnswer(this.props.value)}>
                {this.props.value}
            </button>
        )
    }
} export default ButtonAnswer;