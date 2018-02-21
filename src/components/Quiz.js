import React from 'react';
import { connect } from 'react-redux';
import {
  getUser,
  getCardsAndDecks,
  selectCardIDs
} from '../ducks/reducer';
import CardsList from './CardsList';

class Quiz extends React.Component {

  componentWillMount() {
    this.props.getUser()
    this.props.getCardsAndDecks()
  }

  componentWillUnmount() {
    this.props.selectCardIDs([])
  }

  render() {

    return (
      <div className="Quiz" >
        Quiz
        {this.props.user ? this.props.user.username : null}
        {this.props.user ? this.props.user.qd_id : null}
        {this.props.user ? this.props.user.qd_name : null}
        <CardsList
          filter={card => card.deck_id === this.props.user.qd_id}
          onClick={() => {}}
        />
      </div>
    )
  }
}

const actionCreators = {
  getUser,
  getCardsAndDecks,
  selectCardIDs
}

export default connect(state => state, actionCreators)(Quiz);