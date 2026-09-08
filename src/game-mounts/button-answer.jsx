import React from "react";

class ButtonAnswer extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    render() {
        const { isDisabled, onAnswer, value } = this.props;
        
        const buttonIsDisabled = () => {
            return isDisabled ? "disabled" : "enabled";
        }
        
        return (
            <button type="button"
                    className={"counter answer " + buttonIsDisabled()}
                    onClick={() => onAnswer(value)}
                    disabled={isDisabled}>
                {this.props.value}
            </button>
        )
    }
} export default ButtonAnswer;