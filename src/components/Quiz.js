import React from 'react';
import { connect } from 'react-redux';
import {
  getUser,
  getCardsAndDecks,
  setSelectedCardIDs
} from '../ducks/reducer';
import CardsFilter from './CardsFilter';

class Quiz extends React.Component {

  componentWillMount() {
    this.props.getUser()
    this.props.getCardsAndDecks()
  }

  componentWillUnmount() {
    this.props.setSelectedCardIDs([])
  }

  render() {

    return (
      <div className="Quiz" >
        Quiz
        {this.props.user ? this.props.user.username : null}
        {this.props.user ? this.props.user.qd_id : null}
        {this.props.user ? this.props.user.qd_name : null}
        <CardsFilter
          filter={card => card.deck_id === this.props.user.qd_id}
        />
      </div>
    )
  }
}

const actionCreators = {
  getUser,
  getCardsAndDecks,
  setSelectedCardIDs
}

export default connect(state => state, actionCreators)(Quiz);