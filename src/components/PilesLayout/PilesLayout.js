import React from 'react';
import PlayingCards from '../PlayingCards/PlayingCards';

class PilesLayout extends React.Component {

  constructor() {
    super()
    this.state = {
      index: -1
    }
    this.setIndex = this.setIndex.bind(this)
  }

  setIndex(index) {
    this.setState({ index })
  }

  render() {
    const { user, cardsAndDecks } = this.props;
    return (
      <div className="PilesLayout">
        <PlayingCards
          cardsAndDecks={cardsAndDecks}
          uniqBy={user.qd_id === 0 && "card_id"} // user should never see duplicate cards when playing
          filter={card => (
            user.qd_id > 0 ? card.deck_id === user.qd_id // User-Created Decks
              : user.qd_id === 0 ? card.card_id // All Cards
                : !card.deck_id // Loose Cards (qd_id is -1)
          )}
          setIndex={this.setIndex}
          propsIndex={this.state.index}
        />
      </div>
    )
  }
}

export default PilesLayout;