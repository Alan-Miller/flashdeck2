import React from 'react';
import { connect } from 'react-redux';
import {
  makeNewDeck
} from '../../ducks/reducer';

class MakeDeck extends React.Component {
  constructor() {
    super()
    this.state = {
      deckName: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.makeDeck = this.makeDeck.bind(this)
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  makeDeck() {
    this.props.makeNewDeck(this.state.deckName)
    this.setState({ deckName: '' })
  }

  render() {
    return (
      <div className="MakeDeck">
        <h4>Make a deck</h4>
        <input value={this.state.deckName} name="deckName" placeholder="deck name" type="text" onChange={this.handleInput} />
        <button onClick={this.makeDeck}>Make deck</button>
      </div>
    )
  }
}

const actionCreators = {
  makeNewDeck
};

export default connect(state => state, actionCreators)(MakeDeck);