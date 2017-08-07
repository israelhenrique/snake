import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      scenario: createScenario(10,10),
      snakeDirection: 'up'
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.moveSnake = this.moveSnake.bind(this)
  }
  componentDidMount(){
    this.element.focus();
    setInterval(this.moveSnake, 300)
  }
  moveSnake(){
    const scenario = movePoint(this.state.scenario, this.state.scenario.headPosition, this.state.snakeDirection)
    this.setState({
        scenario: scenario
    })
  }
  handleKeyDown(e){
    console.log(e)
    switch (e.key) {
      case 'ArrowUp':
        if(this.state.snakeDirection !== 'down' )
          this.setState({
              snakeDirection: 'up'
          })
        break;
      case 'ArrowDown':
        if(this.state.snakeDirection !== 'up')
          this.setState({
              snakeDirection: 'down'
          })
        break;
      case 'ArrowLeft':
        if(this.state.snakeDirection !== 'right' )
          this.setState({
              snakeDirection: 'left'
          })
        break;
      case 'ArrowRight':
        if(this.state.snakeDirection !== 'left' )
          this.setState({
              snakeDirection: 'right'
          })
        break;
      default:
    }
  }
  render() {
    return (
      <div ref={(el) => { this.element = el; }} onKeyDown={this.handleKeyDown} tabIndex="0" className="App">
        <Grid grid={this.state.scenario.grid}/>
      </div>
    )
  }
}

function Grid(props){
  return (
    <div className="grid" >
      {(props.grid || []).map((tile, index) => (
        <span key={index}>
          { (index % 10 === 0) && (
            <span className="clearfix" />
          )}
          <Square className="square"  color={tile} />
        </span>
      ))}
    </div>
  )
}

function Square(props) {
    let style = {}
    switch (props.color) {
      case 1:
        style = {background: 'gray'}
        break;
      case 2:
        style = {background: 'darkgray'}
        break;
      default:
        style = {background: 'white'}
    }
    return (
      <span key={props.key} className="square" style={style}>
      </span>
    )
}

const createScenario = (nrows, ncolumns) => {
  let grid = Array(nrows*ncolumns).fill(0)
  const foodPosition = getRandomInt(0, ncolumns*nrows)
  grid[0] = 1
  grid[foodPosition] = 2
  return {grid: grid, headPosition: 0, foodPosition: foodPosition}
}

const movePoint = (scenario, index, direction) => {
  let headPosition = ''
  let foodPosition = scenario.foodPosition
  let grid = scenario.grid.slice();
  const lineLength = Math.sqrt(grid.length)
  const currentLine = Math.floor(index/lineLength)
  switch (direction) {
    case 'up':
      headPosition = index-lineLength
      if(currentLine === 0)
        headPosition = index+lineLength*(lineLength-1)
      grid[headPosition] = 1
      break;
    case 'down':
      headPosition = index+lineLength
      if(currentLine === lineLength-1)
        headPosition = index-lineLength*(lineLength-1)
      grid[headPosition] = 1
      break;
    case 'left':
      headPosition = index-1
      if (Math.floor(headPosition/lineLength) < currentLine)
        headPosition = currentLine*lineLength+(lineLength-1)
      grid[headPosition] = 1
      break;
    case 'right':
      headPosition = index+1
      if (Math.floor(headPosition/lineLength) > currentLine)
        headPosition = currentLine*lineLength
      grid[headPosition] = 1
      break;
    default:
  }
  grid[index] = 0
  if (headPosition === foodPosition){
    do{
      foodPosition = getRandomInt(0, lineLength*lineLength)
    } while (foodPosition === headPosition)
    grid[foodPosition] = 2
  }
  return ({grid: grid, headPosition: headPosition, foodPosition: foodPosition});
}



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default App;
