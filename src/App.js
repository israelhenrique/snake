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

class Grid extends Component {
  constructor(props){
    super(props)
    this.state = {
      grid:  this.props.grid
    }
    this.gridRows = Math.sqrt(this.props.grid.length)
    this.gridColumns = this.gridRows
  }
  renderGridRow(columns,rowNumber){
    const row = []
    for (let i = 0; i < columns; i++) {
      row.push(Square({key: i+rowNumber*10, fill: this.state.grid[i+rowNumber*10]}))
    }
    return(
      <div key={rowNumber} className="grid-row">
        {row}
      </div>
    )
  }
  renderGrid(nrows,ncolumns){
    const rows = []
    for (let i = 0; i < nrows; i++) {
      rows.push(this.renderGridRow(ncolumns,i))
    }
    return rows
  }
  render() {
    return (
      <div className="grid" >
        {this.renderGrid(this.gridRows, this.gridColumns)}
      </div>
    )
  }
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
