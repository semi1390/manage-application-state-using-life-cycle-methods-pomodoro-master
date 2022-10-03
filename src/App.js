import { Component } from "react";
import './App.css';
import ButtonGroup from "./ButtonGroup";
import Timer from './Timer'
import getTimeAsString from './TimerUtility';



export default class App extends Component{

  /* define the constructor and initialize the following:
       1. define timer states with values 'Running', 'Stopped' and 'Ended'
       2. define timers object with object properties: pomodoro and shortBreak, where each property 
       object should have properties: type, timeout, timerState, timeLeft, timeLeftDisplay and message
       3. set the 'currentTimer' state value to pomodoro that has been defined in 2nd step 
    */
  constructor(props){
    super(props)
    this.loop = undefined;

        this.pomodoro ={
          type: 'POMODORO',
          timeout: 1500,
          timerState: 'stopped',
          timeLeft: 1500,
          timeLeftDisplay: '',
          message: 'Time to Work!'
        }
        this.shortBreak ={
          type: 'SHORTBREAK',
          timeout: 300,
          timerState: 'stopped',
          timeLeft: 300,
          timeLeftDisplay: '',
          message: 'Time for Break!'
        }
    
    this.state = { currentTimer: {...this.pomodoro} };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this)
    this.callback = this.callback.bind(this)
    this.endTimer = this.endTimer.bind(this);
    this.navigateToTimer = this.navigateToTimer.bind(this);
    this.navigateToNextTimer = this.navigateToNextTimer.bind(this);
  }

  changeOperation(event){
    clearInterval(this.loop)
    switch (event.target.name){
      case "POMODORO":
        this.setState({currentTimer: {...this.pomodoro} });
        break;
      case "SHORTBREAK":
        this.setState({currentTimer: {...this.shortBreak}});
        break;
    }
  }
    // define startTimer() function to start timer and update the currentTimer state
    startTimer(){
      const {currentTimer} = this.state
      this.loop = setInterval(()=>{
        this.navigateToNextTimer()
        this.setState(prevState =>({
            currentTimer:{
                ...prevState.currentTimer,
                timeLeft: prevState.currentTimer.timeLeft - 1,
                timerState: 'running'
            }
        }))
    }, 1000)
  }
    
    // define endTimer() function to end current timer and navigate to next timer
    endTimer(){
      const {currentTimer} = this.state;
      // clearInterval(this.loop);
      clearInterval(this.loop)
      this.setState(prevState =>({
          currentTimer:{
              ...prevState.currentTimer,
              timerState: 'Ended',
              timeLeft: 0
          }
      }))
      
      this.navigateToTimer()
  }
    
    // define navigateToTimer() function to update currentTimer state with given timer
    navigateToTimer(){
      const {currentTimer} = this.state
      if(currentTimer.type == 'POMODORO'){
          this.setState({currentTimer:{...this.shortBreak}}) 
      }else{
          this.setState({currentTimer:{...this.pomodoro}})
      } 
  }

    // define navigateToNextTimer() function to update currentTimer with next timer state
    navigateToNextTimer(){
      const {currentTimer} = this.state;
      if(currentTimer.type === "POMODORO" && currentTimer.timeLeft === 0){
          this.setState({currentTimer:{...this.shortBreak}})
      } else if(currentTimer.type === "SHORTBREAK" && currentTimer.timeLeft === 0){
          this.setState({currentTimer:{...this.pomodoro}})
      }

  }
    
    // define stopTimer() function to pause the current timer and update the currentTimer state
    stopTimer(){
      console.log('stop')
      clearInterval(this.loop)
      this.setState(prevState =>({
          currentTimer:{
              ...prevState.currentTimer,
              timerState: 'stopped',
              timeout:prevState.currentTimer.timeLeft
          }
      }))
  }

    // define the callback method to change the state of the timeLeft with new value after every second
    callback(){
      // this.navigateToNextTimer()
      const {currentTimer} = this.state
      this.navigateToNextTimer()
      this.setState(prevState =>({
          currentTimer:{
              ...prevState.currentTimer,
              timeLeft: prevState.currentTimer.timeLeft - 1,
              timerState: 'running'
          }
      }))
  }

    // define render method which returns a React element that contains ButtonGroup and Timer component
    render(){
      const {currentTimer} = this.state
      return(
        <div className='app'>
        <header>Pomodoro</header>
        <div className="timer-box">
            <ButtonGroup selectedButton={currentTimer.type} onClick={this.changeOperation.bind(this)} buttons={["POMODORO", "SHORTBREAK"]}></ButtonGroup>
            <div className="timer">
            {currentTimer.timerState == "stopped"
                      ?
                    getTimeAsString(currentTimer.timeout)
                  : <Timer currentTimer={currentTimer}/> }
            </div>
            <div>
            {currentTimer.timerState == "stopped" 
                            ?
                        <button onClick={this.startTimer} className='btn--control'>Start</button>
                            :
                        <>
                            <button className='btn--control' onClick={this.stopTimer}>STOP</button>
                            <button className='btn--control' onClick={this.endTimer}>END</button>
                        </>    
            }
            </div>
        </div>
        <div className="message-container">{currentTimer.message}</div>
    </div>
        
      )
    }
  
}
