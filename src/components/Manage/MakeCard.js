import React from 'react';
import { connect } from 'react-redux';
import {
  makeNewCards
} from '../ducks/reducer';

class MakeCard extends React.Component {
  constructor() {
    super()
    this.state = {
      front: '',
      back: ''
    }
    this.makeCard = this.makeCard.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  makeCard() {
    const { front, back } = this.state
    if (!front || !back) return
    this.props.makeNewCards([{ front, back }])
    this.setState({ front: '', back: '' })
  }

  render() {
    return (
      <div className="MakeCard">
        <h4>Make a card</h4>
        <input value={this.state.front} name="front" placeholder="front" type="text" onChange={this.handleInput} />
        <input value={this.state.back} name="back" placeholder="back" type="text" onChange={this.handleInput} />
        <button onClick={this.makeCard}>Make card</button>
      </div>
    )
  }
}

const actionCreators = {
  makeNewCards
};

export default connect(state => state, actionCreators)(MakeCard);