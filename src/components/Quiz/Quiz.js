import React from 'react';
import { connect } from 'react-redux';
import { getUser, getCardsAndDecks, selectCardIDs } from '../../ducks/reducer';
import PlayingCards from '../PlayingCards/PlayingCards';
import InfoBar from '../InfoBar/InfoBar';

class Quiz extends React.Component {

  componentWillMount() {
    this.props.getUser()
    this.props.getCardsAndDecks()
  }

  componentWillUnmount() {
    this.props.selectCardIDs([])
  }

  render() {
    const { user } = this.props

    return (
      <div className="Quiz" >

        <InfoBar user={user} />
        <PlayingCards
          uniqBy={"card_id"} // user should never see duplicate cards when playing
          filter={card => (
            user.qd_id > 0 ? card.deck_id === user.qd_id // User-Created Decks
              : user.qd_id === 0 ? card.card_id // All Cards
                : !card.deck_id // Loose Cards
          )}
        />

      </div>
    )
  }
}
export default connect(state => state, { getUser, getCardsAndDecks, selectCardIDs })(Quiz);