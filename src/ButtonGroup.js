import React from 'react';
class ButtonGroup extends React.Component{

    // Define the constructor to initialize the state with the selected button 
  
    // Override the appropriate life cycle methods
    
    // Define the render method which returms the tabbed buttons 
    constructor(props){
        super(props)
        this.state = {
            selectedButton : this.props.selectedButton
        }
    } 
    static getDerivedStateFromProps(props, state){
        if(props.selectedButton !== state.selectedButton){
            return{selectedButton: props.selectedButton}
        }
        return null;
    }
    handleClick(event){
        this.setState({selectedButton: event.target.name});
        this.props.onClick(event);
    }
    render(){
        return(
            <div className='timer-box-tabs'>
            {
                this.props.buttons.map((buttonLabel, i) =>
                <button
                    key={i}
                    name={buttonLabel}
                    onClick={(event) => this.handleClick(event)}
                    className={buttonLabel === this.state.selectedButton ? 
                        "btn--tab btn--active" :
                        "btn--tab"}>
                    {buttonLabel}
                </button>)
            }

        </div>
        )
    }
  
}

export default ButtonGroup;