import { Component } from 'react';
import getTimeAsString from './TimerUtility';

export default class Timer extends Component {

    // Define the constructor to initialize the state for startTime and timeLeft
  
    // Define the appropriate life cycle method to start and stop the timer
   
    // Define the render method to display the timeLeft in the format as shown in the mock image
    constructor(props){
        super(props);
        this.state = {time : this.props.currentTimer.timeLeft}
    }
    static getDerivedStateFromProps(props, state){
        console.log('Getting the derived state from props', props, " : ", state);
        return null;
    }
    componentDidMount(){
        this.timerId = setInterval(this.updateTime, 1000);
    }
    updateTime = () =>{
        this.setState({time: this.props.currentTimer.timeLeft})
    }
    componentWillUnmount(){
        // alert('im stopped')
        clearInterval(this.timerId)
    }
    render(){

    return(
        <>
        {getTimeAsString(this.state.time)}
        </>
    )
    }

}