import React, { Component } from 'react';
import './App.css';
import { atob } from './atob';

const animationDuration = '.4s';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fixed: false,
    }
    this.fooRef = React.createRef();
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    const fooEl = this.fooRef.current;
    fooEl.style.transition = `all ease-in ${animationDuration}`;
    fooEl.style.transform  = 'scale(1) translate(0, 0)';
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    this.firstFoo = this.fooRef.current.getBoundingClientRect();
    
    const fooEl = this.fooRef.current;
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    this.lastFoo = this.fooRef.current.getBoundingClientRect();
    const parEl = this.getParagraphEl();  
    const cr = parEl.getBoundingClientRect();
    if(this.state.fixed) {
      parEl.style.height = cr.height + 'px';
    } else {
      parEl.style.height = 0;
    }

    requestAnimationFrame(() => {
      this.fooRef.current.style.transform = atob(this.lastFoo, this.firstFoo);
      this.fooRef.current.style.transition = 'all 0s';  
      this.play();
    });
  }

  play() {
    let fooEl = this.fooRef.current;

    requestAnimationFrame( () => {
      let onTransitionEnd = () => {
        fooEl.removeEventListener('transitionend', onTransitionEnd); 
        const parEl = this.getParagraphEl();  
        if(this.state.fixed) {
          parEl.style.height = 'auto';
          parEl.style.opacity = 1;
        } else {
          //    parEl.style.height = 0;
        }
      };
      fooEl.addEventListener('transitionend', onTransitionEnd);
      fooEl.style.transition = `all ease-in ${animationDuration}`;
      fooEl.style.transform  = 'scale(1) translate(0, 0)';
    });
  }

  getParagraphEl () {
    return this.fooRef.current.querySelector('p'); 
  }

  onClick() {
    if(this.state.fixed) {
      let fooEl = this.fooRef.current;
      let pEl = fooEl.querySelector('p');
      let onTransitionEnd = () => {
        pEl.removeEventListener('transitionend', onTransitionEnd); 
        this.setState({ fixed: false });
      };
      pEl.addEventListener('transitionend', onTransitionEnd);
      pEl.style.opacity = 0;
    } else {
      this.setState({ fixed: true });
    } 
  }

  render() {
    return (
      <div>
        Janette looked at the floor of the carriage when it entered the gateway to Stoneleigh to his surprise and relief the security at the gate waved through the carriage knowing exactly who it’s occupant was. Drawing up to the main entrance to the manor the door of the carriage was opened by a uniformed footman who bowed respectfully.

He knew well not to raise his head until Miss Cat had passed.

Janette stumbled little on the steps caught up in his skirts and a helping hand from Sharista steadied him. 

“Relax Janette eyes are on you.” 

If Sharista’s words were meant to calm him they didn’t and he was becoming increasingly aware of the restrictiveness of his skirts gathering around him. 
      <div className="component-container">
        <div ref={this.fooRef} onClick={this.onClick} className={`foo ${this.state.fixed ? 'fixed': ''}`}>
          <input placeholder="hello world" className="input"/>
          <p className="paragraph-normal">
            One thing I don’t get is why if you put a gun to someone’s head on the street and demands money from the person, the person who did is gets thrown in jail, however, you also get thrown in jail if you don’t pay your taxes. Either scenario entails theft, which is immoral. Of course, with Progressives, their views on morality are twisted.
          </p>
      </div>
    </div>
        Janette looked at the floor of the carriage when it entered the gateway to Stoneleigh to his surprise and relief the security at the gate waved through the carriage knowing exactly who it’s occupant was. Drawing up to the main entrance to the manor the door of the carriage was opened by a uniformed footman who bowed respectfully.

He knew well not to raise his head until Miss Cat had passed.

Janette stumbled little on the steps caught up in his skirts and a helping hand from Sharista steadied him. 

“Relax Janette eyes are on you.” 

If Sharista’s words were meant to calm him they didn’t and he was becoming increasingly aware of the restrictiveness of his skirts gathering around him. 
      </div>
    );
  }
}

export default App;
