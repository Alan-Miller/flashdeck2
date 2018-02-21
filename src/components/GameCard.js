import React from 'react';
import { connect } from 'react-redux';
import { selectCardIDs } from '../ducks/reducer';
import styles from '../styles/styles';

function Card({ card, selectedCardIDs, selectCardIDs }) {

  const selectionStyles = (cardID) => selectedCardIDs.some(id => id === cardID) ? { color: 'red' } : null

  return (
    <div
      className="GameCard"
      style={selectionStyles(card.card_id)}
      onClick={() => selectCardIDs(selectedCardIDs, card.card_id)}
    >
      <div className="cardContainer">
        <div id="card" className="card" onClick={styles.flipPosition}>
          <div className="front">{card.front}</div>
          <div className="back">{card.back}</div>
        </div>
      </div>

    </div>
  )
}

export default connect(state => state, { selectCardIDs })(Card);