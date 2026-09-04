import React from "react";
import starImg from "./assets/STAR.svg"

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
    
    starCount = () => 
    {
        // obtains the rank in the current play state
        const ranks = Math.floor(this.props.solvedProblems / 10);

        // prepares an array to store the images
        const stars = [];

        // and according to how many ranks one has, a star will appear
        for (let i = 0; i < ranks; i++) {
            stars.push(
                <img
                    key={i}
                    src={starImg}
                    alt="Achievement"
                />
            );
        }

        return stars;
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
                        <div style={{ position: 'absolute', width:"100%", top: "10%" }}>
                            {
                                this.starCount()
                            }
                        </div>
                    </>
                </section>
            </div>
        )
    }
} export default ScoreCounter