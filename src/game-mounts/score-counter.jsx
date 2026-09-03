import React from "react";

class ScoreCounter extends React.Component 
{
    constructor(props) {
        super(props);
        
        this.state = {
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
                    // 
                    console.log("Mounting Started")
                })
            }
        );
    }
    
    render () {
        const slideClass =
            this.state.hasMounted && this.props.gameStart
                ? "slide-active"
                : "slide-inactive";
        
        return (
            <div className={`score-counter slide-vertical ${slideClass}`}>
                <section id="center">
                    <>
                        <br/>
                        <button
                            type="button"
                            className="counter"
                            disabled
                        >
                            Correct Answers : {this.props.solvedProblems}
                        </button>
                    </>
                </section>
            </div>
        )
    }
} export default ScoreCounter