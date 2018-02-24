/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PROPS:
  cardsAndDecks:          prop from parent
  title, uniqBy, filter:  optional props from parent
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React from 'react';
import _ from 'lodash';
import styles from '../styles';

function PlayingCards({ cardsAndDecks, title, uniqBy, filter, setIndex, propsIndex }) {
  return (
    <div className="PlayingCards">
      {title || null}
      <br />
      {
        _.uniqBy(cardsAndDecks, uniqBy || (item => item))
          .filter(filter || (item => item))
          .map((card, index) => (
            <div
              key={card.card_id}
              className="cardContainer"
              style={styles.pilePosition(index, propsIndex, cardsAndDecks.length)}
            >
              <div
                className="card"
                style={styles.flipPosition(index, propsIndex)}
                onClick={() => setIndex(propsIndex += 0.5)}
              >
                <div className="front">{card.front}</div>
                <div className="back">{card.back}</div>
              </div>
            </div>
          ))
      }
    </div>
  )
}
export default PlayingCards;
// {/* <div className="card" onClick={styles.flipCard}> */}