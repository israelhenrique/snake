import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid rows='10' columns='10'/>
      </div>
    )
  }
}

class Grid extends Component {
  constructor(props){
    super(props)
    this.state = {
      grid:  createGrid(this.props.rows,this.props.columns)
    }
  }
  renderGridRow(columns,rowNumber){
    const row = []
    for (let i = 0; i < columns; i++) {
      row.push(Square({fill: this.state.grid[i+rowNumber*10]}))
    }
    return(
      <div className="grid-row">
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
      <div className="grid">
        {this.renderGrid(this.props.rows, this.props.columns)}
      </div>
    )
  }
}

function Square(props) {
    const style = props.fill ? {background: 'black'} : {background: 'white'}
    return (
      <span className="square" style={style}>
      </span>
    )
}

const createGrid = (nrows, ncolumns) => (Array(nrows*ncolumns).fill(0))



export default App;
