import React from "react";
import ButtonAnswer from "./button-answer.jsx";
import './math-mini-game.css'

class MathMiniGame extends React.Component 
{
   constructor(props) {
       super(props);
       
       this.state = {
           rightAnswer: 0,
           answers: [],
           variables: [],
           mathFunctions: [],
           difficulty: 0,
           solvedProblems: 0,
           hasMounted: false
       }
   }

    componentDidMount() {
        requestAnimationFrame(
            () =>
            {
                this.setState({
                    hasMounted: true
                }, () => {
                    this.generateNumbers();
                })
            }
        );
    }

    printRightAnswer = () =>
    {
        let theAnswer = 0;
        
        this.state.mathFunctions.forEach((value, index) => 
        {
            let consoleText = "";
            if (index === 0) {
                if (value === "+") 
                {
                    theAnswer = (this.state.variables[index] + this.state.variables[index + 1]);
                    consoleText = this.state.variables[index].toString() + " + " + 
                        this.state.variables[index + 1].toString() + " = " + theAnswer.toString();
                } 
                else 
                {
                    theAnswer = (this.state.variables[index] - this.state.variables[index + 1]);
                    consoleText = this.state.variables[index].toString() + " - " +
                        this.state.variables[index + 1].toString() + " = " + theAnswer.toString();
                }
                
                console.log(consoleText)
            }
            else
            {
                consoleText = theAnswer.toString();
                
                if (value === "+")
                {
                    theAnswer += this.state.variables[index + 1];
                    
                    consoleText += " + " + this.state.variables[index + 1].toString() + " = " + theAnswer.toString();
                }
                else
                {
                    theAnswer -= this.state.variables[index + 1];

                    consoleText += " - " + this.state.variables[index + 1].toString() + " = " + theAnswer.toString();
                }

                console.log(consoleText)
            }
        });
        
        return theAnswer;
    }
    
    printWrongAnswer = (rightAnswer) => {
        // Configuration for your range
        const variance = this.generateRandomNumber(-5, 5);
        
        return (rightAnswer + variance);
    }

    generateRandomNumber = (min, max) => {
        // Configuration for your range
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    returnMathFunc = (value) =>
    {
        let mathSymbol = "";
        switch(value)
        {
            case 0:
            case 3:
            case 4:
                mathSymbol = "+";
                break;
            case 1:
            case 2:
            case 5:
                mathSymbol = "-";
                break;
        }
        return mathSymbol;
    }

    generateNumbers = () => {
       // Temporary holders of variables and math functions
       const newVariables = [];
       const newMathFunctions = [];

        // Additive system to make a math problem with more than 2 variables if possible.
        for (let i = 0; i <= this.state.difficulty; i++) {
            let mathSymbol = "";

            if (i === 0) {
                const numberA = this.generateRandomNumber(0, 10);
                newVariables.push(numberA);

                mathSymbol = this.returnMathFunc(this.generateRandomNumber(0, 5));
                newMathFunctions.push(mathSymbol);

                const numberB = this.generateRandomNumber(0, 10);
                newVariables.push(numberB);
            }
            else
            {
                mathSymbol = this.returnMathFunc(this.generateRandomNumber(0, 5));
                newMathFunctions.push(mathSymbol);

                const numberX = this.generateRandomNumber(0, 10);
                newVariables.push(numberX);
            }
        }
       
        this.setState( () => {
            // Restart all Variables and Math Functions
            this.state.variables = newVariables;
            this.state.mathFunctions = newMathFunctions;
        }, () => {
            this.setAnswerOrder();
        });
    }
    
    setAnswerOrder = () => {
        const constRightAnswer = this.printRightAnswer();
        
        let wrongAnswerA = this.printWrongAnswer(constRightAnswer);
        
        let wrongAnswerB = this.printWrongAnswer(constRightAnswer);
        
        if(wrongAnswerA === constRightAnswer)
        {
            wrongAnswerA++;
        }
        
        if (wrongAnswerB === constRightAnswer)
        {
            wrongAnswerB--;
        }

        const randomOrder = this.generateRandomNumber(0, 2);

        let constAnswers;
       
       switch (randomOrder)
       {
           case 0:
               constAnswers = [
                   constRightAnswer, 
                   wrongAnswerA, 
                   wrongAnswerB]
               ;
               break;
           case 1:
               constAnswers = [
                   wrongAnswerA,
                   constRightAnswer, 
                   wrongAnswerB
               ];
                break;
           case 2:
               constAnswers = [
                   wrongAnswerA, 
                   wrongAnswerB,
                   constRightAnswer
               ];
                break;
       }

        this.setState({
            answers: constAnswers
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.solvedProblems !== prevProps.solvedProblems) {
            this.setState(prevState => ({
                solvedProblems: prevState.solvedProblems + 1
            }),
                () => {
                
                if(this.state.solvedProblems >= 10)
                {
                    this.setState(prevState => ({
                        solvedProblems: 0,
                        difficulty: prevState.difficulty + 1,
                    }), () =>
                    {
                        this.generateNumbers();
                    })
                    
                    return;
                }
                
                this.generateNumbers();
                }
            );
        }
    }

    handleSubmitAnswer = (answer) => {
        this.props.onSubmitData({
            value: answer,
            rightAnswer: this.printRightAnswer()
        });
    }

    render() {
        const slideClass =
            this.state.hasMounted && this.props.gameStart
                ? "slide-active"
                : "slide-inactive";
       
        let mathFormulaText = "";

        this.state.mathFunctions.forEach((value, index) => {

            if (index === 0)
            {
                mathFormulaText += this.state.variables[index] + " " + value + " " + this.state.variables[index + 1] ;
            }
            else
            {
                mathFormulaText += " " + value + " " + this.state.variables[index + 1];
            }
        });
       
        const listOfButtons = this.state.answers.map((answer, index) => {
            return (
                <ButtonAnswer
                    key={index}
                    value={answer}
                    onAnswer={this.handleSubmitAnswer}
                />
            );
        });
       
       return (<div className={`slide-from-right ${slideClass}`} style={{ textAlign: 'center', fontFamily: 'monospace', 
           fontSize: '2rem' }}>
           <div>
               <h5>
                   <p id={"mathFormula"}>{mathFormulaText} = ???</p>
               </h5>
           </div>
           <br/>
           <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '2rem'}}>
               <form>
                   {listOfButtons}
               </form>
           </div>
       </div>)
   }
} export default MathMiniGame