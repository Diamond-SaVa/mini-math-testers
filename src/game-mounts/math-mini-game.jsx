import React from "react";
import ButtonAnswer from "./button-answer.jsx";

class MathMiniGame extends React.Component 
{
   constructor(props) {
       super(props);
       
       this.state = {
           numberA : 0,
           numberB : 0,
           mathFunc : 0,
           rightAnswer: 0,
           answers: []
       }
   }

    printRightAnswer = () =>
    {
        let theAnswer = 0;
        switch (this.state.mathFunc)
        {
            case 0:
                theAnswer = this.state.numberA + this.state.numberB;
                break;
            case 1:
                theAnswer = this.state.numberA - this.state.numberB;
                break;
            case 2:
                theAnswer = this.state.numberA * this.state.numberB;
                break;
        }
        return theAnswer;
    }

    printWrongAnswer = () =>
    {
        const Variance = this.generateRandomNumber(-5, 5);
        const VarianceA = this.state.numberA + Variance;
        const VarianceB = this.state.numberB + Variance;
        let WrongAnswer = 0;

        switch (this.state.mathFunc)
        {
            case 0:
                WrongAnswer = VarianceA + VarianceB;
                if (WrongAnswer === this.printRightAnswer())
                {
                    WrongAnswer++;
                }
                break;
            case 1:
                WrongAnswer = VarianceA - VarianceB;
                if (WrongAnswer === this.printRightAnswer())
                {
                    WrongAnswer--;
                }
                break;
            case 2:
                WrongAnswer = (this.state.numberA * this.state.numberB) + VarianceB;
                if (WrongAnswer === this.printRightAnswer())
                {
                    WrongAnswer++;
                }
                break;
        }

        return WrongAnswer;
    }

    generateRandomNumber = (min, max) => {
        // Configuration for your range
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateNumbers = () => {
        this.setState({
            numberA: this.generateRandomNumber(0, 10),
            numberB: this.generateRandomNumber(0, 10),
            mathFunc: this.generateRandomNumber(0, 2)
        }, () => {
            this.setAnswerOrder();
        });
    }
    
    setAnswerOrder = () => {
        const constRightAnswer = this.printRightAnswer();
        
        let wrongAnswerA = this.printWrongAnswer();
        
        let wrongAnswerB = this.printWrongAnswer();
        
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
    
    printMathFunc = () => 
    {
       switch (this.state.mathFunc) 
       {
           case 0:
               return " + ";
           case 1:
               return " - ";
           case 2:
               return " x ";
       }
    }

    componentDidMount() {
       this.generateNumbers();
   }

    componentDidUpdate(prevProps) {
        if (this.props.timeBonus !== prevProps.timeBonus) {
            this.generateNumbers();
        }
    }

    handleSubmitAnswer = (answer) => {
        this.props.onSubmitData({
            value: answer,
            rightAnswer: this.printRightAnswer()
        });
    }

    render() {
       return (<div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '2rem' }}>
           <div>
               <h3>
                   {this.state.numberA} 
                   {this.printMathFunc()}
                   {this.state.numberB}
               </h3>
           </div>
           <br/>
           <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '2rem'}}>
               <form>
               <ButtonAnswer value={this.state.answers[0]} onAnswer={this.handleSubmitAnswer}/>
               <ButtonAnswer value={this.state.answers[1]} onAnswer={this.handleSubmitAnswer}/>
               <ButtonAnswer value={this.state.answers[2]} onAnswer={this.handleSubmitAnswer}/>
               </form>
           </div>
       </div>)
   }
} export default MathMiniGame