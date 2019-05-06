import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//Component for All Calculator Buttons
//Key entries affect main display and cumulative display of Calculator component.
class Keys extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  //Handles clicks for all buttons
  handleClick() {
    //prevDis is the last element of the state.display array
    let prevDis = this.props.display[this.props.display.length-1];
    //Handling numbers:
    if(this.props.type === 'num'){
      //Do nothing if user enters initial zeros
      if (this.props.display.length===0 && this.props.id==='zero'){}
      //If expression was previously evaluated, reset displays with current value
      else if (this.props.cumDisplay.includes('=')){
        this.props.setMainDisplay([this.props.symbol]);
        this.props.setCumDisplay([this.props.symbol]);
      }
      //If last entry was an operator, replace operator with current number (main display)
      else if (isNaN(prevDis) && prevDis !=='.'){
        this.props.setMainDisplay([this.props.symbol]);
        this.props.addToCumDisplay(this.props.symbol);
      }
      //Otherwise, add number to display
      else {
        this.props.addToMainDisplay(this.props.symbol);
        this.props.addToCumDisplay(this.props.symbol);
      }

    }
    //Handling decimal key:
    if(this.props.type === 'decimal'){
      //If main display already contains decimal, do nothing.
      if(this.props.display.includes('.')){}
      //If prev. entry was operator, reset main display to '0.'
      else if (isNaN(prevDis)){
        this.props.setMainDisplay([0, '.']);
        this.props.addToCumDisplay(0, '.');
      }
      //Reset to '0.' if expression was previously evaluated.
      else if (this.props.cumDisplay.includes('=')){
        this.props.setMainDisplay([0, '.']);
        this.props.setCumDisplay([0, '.']);
      }
      //If initial keypress is '.', set/add '0.'
      else if (this.props.display.length===0){
        this.props.setMainDisplay([0, '.']);
        this.props.addToCumDisplay(0, '.');
      }
      //Otherwise add decimal to displays.
      else {
        this.props.addToMainDisplay(this.props.symbol);
        this.props.addToCumDisplay(this.props.symbol);
      }
    }
    //Handle AC button by clearing both displays.
    if(this.props.type === 'clear'){
      this.props.clearBothDisplay();
    }
    //Handle operations:
    if(this.props.type==='op'){
      //Do nothing if initial keypress is an operation.
      if (this.props.display.length===0) {

      }
      //If expression was previously evaluated, perform operation on the result
      else if(this.props.cumDisplay.includes('=')){
        this.props.setCumDisplay([...this.props.display, this.props.symbol]);
        this.props.setMainDisplay([this.props.symbol]);
      }
      //If previous entry not a number, replace it with current operator.
      else if (isNaN(prevDis)){
        let tempDisplay = this.props.display.slice();
        tempDisplay.pop();
        this.props.setMainDisplay(tempDisplay.concat(this.props.symbol));
        let tempCum = this.props.cumDisplay.slice();
        tempCum.pop();

        this.props.setCumDisplay(tempCum.concat(this.props.symbol));
      }
      //Otherwise, add operation to displays
      else{
        this.props.addToCumDisplay(this.props.symbol);
        this.props.setMainDisplay([this.props.symbol]);
      }
    }
    //Handle equals:
    if(this.props.type==='equals'){
      //Do nothing if 'equals' is initial press.
      if (this.props.display.length===0){}
      //Otherwise evaluate expression in cum. display.
      else if (!this.props.cumDisplay.includes('=')){
        this.props.calculate();
      }
    }

  }
  render() {

    return (
      <div className="calc-keys" onClick={this.handleClick}
      id={this.props.id} >{this.props.symbol}
      </div>
    );
  }
}



//Array of all calc. button properties.
const BtnInfo = [
  {id: 'add',
  symbol: '+',
  type: 'op'},
  {id: 'subtract',
  symbol: '-',
  type: 'op'},
  {id: 'multiply',
  symbol: '*',
  type: 'op'},
  {id: 'divide',
  symbol: '/',
  type: 'op'},
  {id: 'one',
  symbol: 1,
  type: 'num'},
  {id: 'two',
  symbol: 2,
  type: 'num'},
  {id: 'three',
  symbol: 3,
  type: 'num'},
  {id: 'four',
  symbol: 4,
  type: 'num'},
  {id: 'five',
  symbol: 5,
  type: 'num'},
  {id: 'six',
  symbol: 6,
  type: 'num'},
  {id: 'seven',
  symbol: 7,
  type: 'num'},
  {id: 'eight',
  symbol: 8,
  type: 'num'},
  {id: 'nine',
  symbol: 9,
  type: 'num'},
  {id: 'zero',
  symbol: 0,
  type: 'num'},
  {id: 'clear',
  symbol: 'AC',
  type: 'clear'},
  {id: 'decimal',
  symbol: '.',
  type: 'decimal'},
  {id: 'equals',
  symbol: '=',
  type: 'equals'}
];


//Component containing buttons and displays
class Calculator extends React.Component {
  constructor(props){
    super(props);
    /******
    *display: Array of elements to be displayed in main display of calc.
    *cumDisplay
    */
    this.state = {
      display: [],
      cumDisplay: [],
    };
    this.addToMainDisplay = this.addToMainDisplay.bind(this);
    this.clearBothDisplay = this.clearBothDisplay.bind(this);
    this.clearMainDisplay = this.clearMainDisplay.bind(this);
    this.addToCumDisplay = this.addToCumDisplay.bind(this);
    this.calculate = this.calculate.bind(this);
    this.setMainDisplay = this.setMainDisplay.bind(this);
    this.setCumDisplay = this.setCumDisplay.bind(this);
  }
  //Adds elem to state.display
  addToMainDisplay(elem){
    this.setState({display: [...this.state.display, elem]});
  }
  //Sets state.display to 'display'
  setMainDisplay(display){
    this.setState({display: display});
  }
  //Sets state.cumDisplay to 'display'
  setCumDisplay(display){
    this.setState({cumDisplay: display});
  }
  //Set displays to empty arrays
  clearBothDisplay () {
    this.setState({display: [], cumDisplay: []});
  }
  //Set only state.display to empty array
  clearMainDisplay () {
    this.setState({display: []});

  }
  //Adds elements to cum. display
  addToCumDisplay (...elem) {
    this.setState({cumDisplay: [...this.state.cumDisplay,...elem]});
  }

  calculate() {
    //If previous entry was not a number:
    if (isNaN(this.state.cumDisplay[this.state.cumDisplay.length-1])){
      //Copy cumDisplay and remove non-number
      let tempCum = this.state.cumDisplay.slice();
      tempCum.pop();
      //Create str from tempCum, and split it into operators and numbers
      let expStr = tempCum.join('');
      let expArr = expStr.split(/(\+|-|\*|\/|=)/);
      //Map string containing numbers into floats.
      let arr = expArr.map(x => {
        if (!isNaN(Number.parseFloat(x))){
          return Number.parseFloat(x);
        }
        else {
          return x;
        }
      });
      //Use evalExp function to calculate expression and round to 4 decimal pts.
      let value = Math.floor(evalExp(arr)*10000)/10000;
      //Set display with the value
      this.setState({display: [value], cumDisplay: [...tempCum, '=', value]});
    }
    //If last entry was a number:
    else  {
      //Copy cumDisplay, turn it into string, and split it into array
      //at junctions between operators and numbers.
      let exp = this.state.cumDisplay.slice();
      let expStr = exp.join('');
      let expArr = expStr.split(/(\+|-|\*|\/|=)/);
      //Map strings containing numbers into floats.
      let arr = expArr.map(x => {
        if (!isNaN(Number.parseFloat(x))){
          return Number.parseFloat(x);
        }
        else {
          return x;
        }
      });
    //Evaluate expression with evalExp and round to 4 decimal pts.
    let value = Math.floor(evalExp(arr)*10000)/10000;
    //Update state
    this.setState({display: [value], cumDisplay: [...this.state.cumDisplay, '=', value]});
   }
  }
  render(){
    //Add properties to buttons
    const Btns = BtnInfo.map(x => {
      return <Keys key={x.id+1} id={x.id} symbol={x.symbol}
      type={x.type}
      calculate={this.calculate}
      addToMainDisplay={this.addToMainDisplay}
      clearBothDisplay={this.clearBothDisplay}
      clearMainDisplay={this.clearMainDisplay}
      addToCumDisplay={this.addToCumDisplay}
      setMainDisplay={this.setMainDisplay}
      display={this.state.display}
      cumDisplay={this.state.cumDisplay}
      setCumDisplay={this.setCumDisplay}/>;
    });

    return (
      <div id='container'>
      <h1>Calculator</h1>
      <div id="button-container">
        <div id="display-container">
        <div id="cum-display">
          {this.state.cumDisplay.join('')}
        </div>
        <div id="display">{this.state.display.length===0 ? 0 : this.state.display.join('')}</div>
        </div>
        {Btns}

      </div>
      <p>Made with React.js</p>
      </div>
    );


  }

}
//This function takes array (arr) of operators (/,*,+,-) and numbers
//representing an expression and evaluates it.
//Example 33+4.5 is [33, '+', 4.5]
function evalExp(arr) {
  //Base case:  When arr is length 1, return the value it contains.
  if(arr.length === 1){
    return Number.parseFloat(arr.pop());
  }
  //Calculate mult. and div. first.
  if (arr.includes('*') || arr.includes('/')){
    for (let i = 0; i < arr.length; i++){
      //Replace '*' and number on either side with their product or
      //replace '/' and numbers on either side with their quotient.
      //Recursively pass new array.
      if(arr[i] === '*'){
        return evalExp(arr.slice(0, i-1).concat(arr[i-1]*arr[i+1]).concat(arr.slice(i+2, arr.length)));
      }
      else if (arr[i] === '/'){
        return evalExp(arr.slice(0, i-1).concat(arr[i-1]/arr[i+1]).concat(arr.slice(i+2, arr.length)));
      }
    }
  }
  //Next evaluate addition and subtraction in same manner as above.
  else if (arr.includes('+') || arr.includes('-')){
    for (let i = 0; i < arr.length; i++){
      if(arr[i] === '+'){
        return evalExp(arr.slice(0, i-1).concat(arr[i-1]+arr[i+1]).concat(arr.slice(i+2, arr.length)));
      }
      else if (arr[i] === '-'){
        return evalExp(arr.slice(0, i-1).concat(arr[i-1]-arr[i+1]).concat(arr.slice(i+2, arr.length)));
      }
    }

  }


}


ReactDOM.render(<Calculator />, document.getElementById('root'));
