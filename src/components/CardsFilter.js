import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  setSelectedCardIDs,
  deleteCards
} from '../ducks/reducer';

export function CardsFilter(props) {

  function removeCard(cardIDs) {
    props.deleteCards(cardIDs)
  }

  function selectCard(cardID) {
    const { selectedCardIDs } = props
    const selectedCardIndex = selectedCardIDs.findIndex(id => id === cardID)

    if (selectedCardIndex === -1) {
      props.setSelectedCardIDs([...selectedCardIDs, cardID])
    }
    else {
      const selectedCardIDsCopy = selectedCardIDs.slice()
      selectedCardIDsCopy.splice(selectedCardIndex, 1)
      props.setSelectedCardIDs(selectedCardIDsCopy)
    }
  }

  const selectedStyles = cardID => {
    return (
      props.selectedCardIDs.some(id => id === cardID) ?
        { color: 'red' }
        : null
    )
  }

  return (
    <div className="CardsFilter">
      {props.children}
      {
        _.uniqBy(props.cardsAndDecks, props.uniqByProp || (item => item))
          .filter(props.filterFn || (item => item))
          .map(card => (
            <div
              key={card.card_id}
              style={selectedStyles(card.card_id)}
              onClick={() => selectCard(card.card_id)}
            >{card.front} {card.back}
            </div>
          ))
      }
    </div>
  )

}

const actionCreators = {
  setSelectedCardIDs,
  deleteCards
};

export default connect(state => state, actionCreators)(CardsFilter);