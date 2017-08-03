import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      scenario: createScenario(10,10)
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  componentDidMount(){
    this.element.focus();
  }
  handleKeyDown(e){
    const scenario = movePoint(this.state.scenario.grid, this.state.scenario.headPosition, e.key)
    this.setState({
        scenario: scenario
    })
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
          <Square className="square"  fill={tile} />
        </span>
      ))}
    </div>
  )
}

function Square(props) {
    const style = props.fill ? {background: 'black'} : {background: 'white'}
    return (
      <span key={props.key} className="square" style={style}>
      </span>
    )
}

const createScenario = (nrows, ncolumns) => {
  let grid = Array(nrows*ncolumns).fill(0)
  grid[0] = 1
  return {grid: grid, headPosition: 0}
}

const movePoint = (grid, index, direction) => {
  let headPosition = ''
  const lineLength = Math.sqrt(grid.length)
  switch (direction) {
    case 'ArrowUp':
      headPosition = index-lineLength
      grid[headPosition] = 1
      break;
    case 'ArrowDown':
      headPosition = index+lineLength
      grid[headPosition] = 1
      break;
    case 'ArrowLeft':
      headPosition = index-1
      grid[headPosition] = 1
      break;
    case 'ArrowRight':
      headPosition = index+1
      grid[headPosition] = 1
      break;
    default:
  }
  grid[index] = 0
  return ({grid: grid, headPosition: headPosition});
}

export default App;
