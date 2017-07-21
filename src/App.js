import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid rows='100' columns='100'/>
      </div>
    )
  }
}

class Grid extends Component {
  renderGridRow(columns){
    const row = []
    for (let i = 0; i < columns; i++) {
      row.push(Square())
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
      rows.push(this.renderGridRow(ncolumns))
    }
    return rows
  }
  render() {
    console.log(this.props.rows)
    return (
      <div className="grid">
        {this.renderGrid(this.props.rows, this.props.columns)}
      </div>
    )
  }
}

function Square() {
    return (
      <span className="square">
      </span>
    )
}

export default App;
