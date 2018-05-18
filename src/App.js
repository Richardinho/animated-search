import React, { Component } from 'react';
import './App.css';
import { atob } from './atob';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fixed: false,
      showInstructions: false,
    }
    this.inputRef = React.createRef();
    this.fooRef = React.createRef();
    this.instructionsRef = React.createRef();
    this.onClick = this.onClick.bind(this);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if(prevState.fixed !== this.state.fixed) {
      this.firstInput = this.inputRef.current.getBoundingClientRect();
      this.firstInstructions = this.instructionsRef.current.getBoundingClientRect();
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.fixed !== this.state.fixed) {
      let instructionsBackground;
      if(this.state.fixed) {
        instructionsBackground = 'white';
      } else {
        instructionsBackground = 'pink';
      }
      this.lastInput = this.inputRef.current.getBoundingClientRect();
      this.lastInstructions = this.instructionsRef.current.getBoundingClientRect();

      requestAnimationFrame( () => {
        this.inputRef.current.style.transform = atob(this.lastInput, this.firstInput);
        this.instructionsRef.current.style.transform = atob(this.lastInstructions, this.firstInstructions);


        this.inputRef.current.style.transition = 'all 0s';  
        this.instructionsRef.current.style.transition = 'all 0s';  
        this.instructionsRef.current.style.background = instructionsBackground;  
                    this.play();
      });
    }
  }

  play() {

    let instructionsBackground;

    requestAnimationFrame( () => {
      const afterTransition = () => {
        this.inputRef.current.removeEventListener('transitionend', afterTransition); 
        if(this.state.fixed) {
          this.showInstructions();
          instructionsBackground = 'pink';
        } else {
          instructionsBackground = 'white';
        }
        
      };
      this.inputRef.current.addEventListener('transitionend', afterTransition);
      this.inputRef.current.style.transition = 'all ease-in 450ms';
      this.inputRef.current.style.transform  = 'scale(1) translate(0, 0)';

      this.instructionsRef.current.style.transition = 'all ease-in 450ms';
      this.instructionsRef.current.style.transform  = 'scale(1) translate(0, 0)';
        this.instructionsRef.current.style.background = instructionsBackground;  
      
    });
  }

  showInstructions() {
    console.log('show instructions');
    this.fooRef.current.classList.add('show');

  }
  hideInstructions() {
    const fooRef = this.fooRef.current;

    return new Promise(resolve => {
      const afterTransition = () => {
        fooRef.removeEventListener('transitionend', afterTransition);  
        resolve();
      };
      fooRef.addEventListener('transitionend', afterTransition);

      this.fooRef.current.classList.remove('show');
    });
  }

  onClick() {
    
    if(this.state.fixed) {
      this.hideInstructions().then(() => {
        this.setState({ fixed: false });
      });
    } else {
      this.setState({ fixed : true });
    }
  }

  render() {
    return (
      <div className="container">
        <div 
          onClick={this.onClick}
          className={`header ${this.state.fixed ? 'fixed': ''}`}>
          <div ref={this.inputRef} className="input-container">
            <input />
          </div>
          <div ref={this.instructionsRef} className="instructions">
            <div ref={this.fooRef} className='instruction-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
