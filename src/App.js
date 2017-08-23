import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      scenario: createScenario(10,10),
    }
    this.snakeDirection = 'up'
    this.commandList = ['up']
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.moveSnake = this.moveSnake.bind(this)

  }
  componentDidMount(){
    this.element.focus();
    setInterval(this.moveSnake, 300)
  }
  moveSnake(){
    this.snakeDirection = (this.commandList.shift() || this.snakeDirection);
    //const scenario = movePoint(this.state.scenario, this.state.scenario.headPosition, this.snakeDirection)
    const scenario = moveSnake(this.state.scenario, this.snakeDirection)
    this.setState({
        scenario: scenario
    })
  }
  handleKeyDown(e){
    switch (e.key) {
      case 'ArrowUp':
        if (this.snakeDirection !== 'down')
          this.commandList.push('up')
        break;
      case 'ArrowDown':
        if (this.snakeDirection !== 'up')
          this.commandList.push('down')
        break;
      case 'ArrowLeft':
        if (this.snakeDirection !== 'right')
          this.commandList.push('left')
        break;
      case 'ArrowRight':
        if (this.snakeDirection !== 'left')
          this.commandList.push('right')
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

const plotSnake = (grid,snake) => {
  for (var i = 0; i < snake.length; i++) {
    grid[snake[i]] = 1
  }
  return grid
}

const createScenario = (nrows, ncolumns) => {
  let grid = Array(nrows*ncolumns).fill(0)
  const foodPosition = getRandomInt(0, ncolumns*nrows)
  const snake = [4,5,6]
  //grid[0] = 1
  grid[foodPosition] = 2
  //grid = plotSnake(grid,snake)
  return {grid: grid, headPosition: 0, snake: snake,foodPosition: foodPosition}
}

const moveSnake = (scenario, direction) => {
  let headPosition = ''
  let foodPosition = scenario.foodPosition
  const snake = scenario.snake
  let grid = scenario.grid.slice();
  const lineLength = Math.sqrt(grid.length)
  const currentLine = Math.floor(snake[0]/lineLength)
  console.log(snake[0])
  switch (direction) {
    case 'up':
      headPosition = snake[0]-lineLength
      if(currentLine === 0)
        headPosition = snake[0]+lineLength*(lineLength-1)
      break;
    case 'down':
      headPosition = snake[0]+lineLength
      if(currentLine === lineLength-1)
        headPosition = snake[0]-lineLength*(lineLength-1)
      break;
    case 'left':
      headPosition = snake[0]-1
      if (Math.floor(headPosition/lineLength) < currentLine)
        headPosition = currentLine*lineLength+(lineLength-1)
      break;
    case 'right':
      headPosition = snake[0]+1
      if (Math.floor(headPosition/lineLength) > currentLine)
        headPosition = currentLine*lineLength
      break;
    default:
  }
  for (var i = 0; i < snake.length; i++) {
    grid[snake[i]] = 0
  }
  const newSnake = newSnakePosition(snake,headPosition)
  console.log(snake)
  if (headPosition === foodPosition){
    do{
      foodPosition = getRandomInt(0, lineLength*lineLength)
    } while (foodPosition === headPosition)
    grid[foodPosition] = 2
  }
  const newGrid = plotSnake(grid,newSnake)
  return ({grid: newGrid, headPosition: headPosition,snake: newSnake, foodPosition: foodPosition});
}

const newSnakePosition = (snake,nextHeadPosition) => {
  const newSnake =  snake.map((pos,index, snake) => {
    if (index === 0)
      return nextHeadPosition
    else {
      return snake[index-1]
    }
  })

  return newSnake

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default App;
