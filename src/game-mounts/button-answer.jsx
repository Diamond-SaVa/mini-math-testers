import React from "react";

class ButtonAnswer extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    render() {
        const buttonIsDisabled = () => {
            return this.props.isDisabled ? "disabled" : "enabled";
        }
        
        return (
            <button type="button"
                    className={"counter answer " + buttonIsDisabled()}
                    onClick={() => this.props.onAnswer(this.props.value)}
                    disabled={this.props.isDisabled}>
                {this.props.value}
            </button>
        )
    }
} export default ButtonAnswer;