import React from "react";
import starImg from "./assets/STAR.svg"
import starUpSound from "./assets/starUp.wav"
import { playLocalSound } from "../utilities/audio-utils.js";
import "./star-record.css"

class StarRecord extends React.Component {
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
                    playLocalSound(starUpSound);
                })
            }
        );
    }
    
    render() {
        const { id } = this.props;

        const starClass =
            this.state.hasMounted
                ? "star-active"
                : "";
        
        return (
            <img
                className={`star ${starClass}`}
                key={id}
                src={starImg}
                alt={"Achievement_" + id.toString()}
            />  
        );
    }
    
} export default StarRecord;