import React from "react";
import './math-mini-game.css'
import ButtonAnswer from "./button-answer.jsx";
import GameMessage from "./pop-up-message.jsx";
import { playLocalSound } from "../utilities/audio-utils.js";
import correctSound from "./assets/correct.wav";
import tryAgainSound from "./assets/try_again.wav";

class MathMiniGame extends React.Component 
{
   constructor(props) {
       super(props);
       
       this.state = {
           rightAnswer: 0,
           answers: [],
           variables: [],
           mathFunctions: [],
           solvedProblems: 0,
           hasMounted: false,
           isInCooldown: false,
           rightOrWrong: 0
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
        
        const {mathFunctions, variables } = this.state;

        mathFunctions.forEach((value, index) => 
        {
            let consoleText;
            if (index === 0) {
                if (value === "+") 
                {
                    theAnswer = (variables[index] + variables[index + 1]);
                    consoleText = variables[index].toString() + " + " + 
                        variables[index + 1].toString() + " = " + theAnswer.toString();
                } 
                else 
                {
                    theAnswer = (variables[index] - variables[index + 1]);
                    consoleText = variables[index].toString() + " - " +
                        variables[index + 1].toString() + " = " + theAnswer.toString();
                }
                
                console.log(consoleText)
            }
            else
            {
                consoleText = theAnswer.toString();
                
                if (value === "+")
                {
                    theAnswer += variables[index + 1];
                    
                    consoleText += " + " + variables[index + 1].toString() + " = " + theAnswer.toString();
                }
                else
                {
                    theAnswer -= variables[index + 1];

                    consoleText += " - " + variables[index + 1].toString() + " = " + theAnswer.toString();
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
       
       const difficulty = Math.floor(this.props.solvedProblems / 10);

        // Additive system to make a math problem with more than 2 variables if possible.
        for (let i = 0; i <= difficulty; i++) {
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
        const { solvedProblems: newSolvedProblems } = this.props;

        const { solvedProblems: prevSolvedProblems } = prevProps;
       
        if (newSolvedProblems > prevSolvedProblems) {
            this.setState(prevState => ({
                solvedProblems: prevSolvedProblems + 1
            }),
                () => {
                
                this.generateNumbers();
                }
            );
        }
    }
    
    turnOnCoolDown = () =>
    {
        this.setState(prevState => ({
            isInCooldown: !prevState.isInCooldown
        }))

        setTimeout(() => {
            this.setState(prevState => ({
                isInCooldown: !prevState.isInCooldown
            }), this.returnBackgroundToNormal
            );
        }, 1000);
    }

    handleSubmitAnswer = (answer) => {
       
       const theRightAnswer = this.printRightAnswer();

       const wasPlayerRightOrWrong = answer === theRightAnswer ? 1 : -1;

       playLocalSound(answer === theRightAnswer ? correctSound : tryAgainSound);

       this.props.onSubmitData({
            value: answer,
            rightAnswer: theRightAnswer
        }, []);
        
        this.setState(({ 
            rightOrWrong: wasPlayerRightOrWrong
        }), this.turnOnCoolDown);
    }
    
    returnBackgroundToNormal = () =>
    {
        this.setState(({
            rightOrWrong: 0
        }));
    }

    render() {
        const { hasMounted, mathFunctions, variables, answers, isInCooldown, rightOrWrong } = this.state;
        const { pleaseExit, gameStart } = this.props;
       
        const slideClass =
            hasMounted && !pleaseExit
                ? "slide-active"
                : "slide-inactive";
       
        let mathFormulaText = "";

        mathFunctions.forEach((value, index) => {
            if (index === 0)
            {
                mathFormulaText += variables[index] + " " + value + " " + variables[index + 1] ;
            }
            else
            {
                mathFormulaText += " " + value + " " + variables[index + 1];
            }
        });
       
        const listOfButtons = answers.map((answer, index) => {
            return (
                <ButtonAnswer
                    key={index}
                    value={answer}
                    onAnswer={this.handleSubmitAnswer}
                    isDisabled={
                        isInCooldown ||
                        !gameStart
                    }
                />
            );
        });

        const rightOrWrongAnswer = () => {
            if(rightOrWrong === 1)
            {
                return (<GameMessage
                    isRightOrWrong={true}
                    message={"Correct!"}
                    canRise={true}
                />);
            }

            if(rightOrWrong === -1)
            {
                return (<GameMessage
                    isRightOrWrong={false}
                    message={"Try Again!"}
                    canRise={true}
                />);
            }

            return ("");
        }
        
        const printGameOrGameOver = () =>
        {
            const {gameStart} = this.props;
            if (gameStart)
            {
                return (
                    <>
                        <div>
                            <h5>
                                <p id={"mathFormula"}>{mathFormulaText} = ???</p>
                            </h5>
                        </div>
                        { rightOrWrongAnswer() }
                        <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '2rem'}}>
                            <form>
                                {listOfButtons}
                            </form>
                        </div>
                    </>
                );
            } 
            else
            {
                return(
                    <h5>
                        <p>GAME OVER</p>
                    </h5>
                );
            }
        }
        
        return (
            <div className={`slide-from-right ${slideClass}`} style={{ textAlign: 'center', fontFamily: 'monospace', 
               fontSize: '2rem' }}>
               {printGameOrGameOver()}
           </div>
        )
   }
} export default MathMiniGame