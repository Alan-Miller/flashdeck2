import React from 'react';
import PlayingCards from '../PlayingCards/PlayingCards';
import InfoBar from '../InfoBar/InfoBar';

export default function Quiz(props) {
  const { user, cardsAndDecks } = props

  return (
    <div className="Quiz" >
      <InfoBar user={user} />
      <PlayingCards
        cardsAndDecks={cardsAndDecks}
        uniqBy={user.qd_id === 0 && "card_id"} // user should never see duplicate cards when playing
        filter={card => (
          user.qd_id > 0 ? card.deck_id === user.qd_id // User-Created Decks
            : user.qd_id === 0 ? card.card_id // All Cards
              : !card.deck_id // Loose Cards (qd_id is -1)
        )}
      />
    </div>
  )
}