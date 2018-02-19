import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

function Cards(props) {

  const { manage } = props;

  function removeCard(cardIDs) {
    props.deleteCards(cardIDs)
  }

  function selectCard(cardID) {
    const { selectedCardIDs } = manage.state
    const selectedCardIndex = selectedCardIDs.findIndex(id => id === cardID)

    if (selectedCardIndex === -1) {
      manage.setState({ selectedCardIDs: [...selectedCardIDs, cardID] })
    }
    else {
      const selectedCardIDsCopy = selectedCardIDs.slice()
      selectedCardIDsCopy.splice(selectedCardIndex, 1)
      manage.setState({ selectedCardIDs: selectedCardIDsCopy })
    }
  }

  const selectedStyles = (cardID) => {
    return (
      manage.state.selectedCardIDs.some(id => id === cardID) ?
        { color: 'red' }
        : null
    )
  }

  return (
    _.uniqBy(props.cardsAndDecks, 'card_id')
      .filter(card => !!card.card_id)
      .map(card => (
        <div
          key={card.card_id}
          style={selectedStyles(card.card_id)}
          onClick={() => selectCard(card.card_id)}
        >
          {card.front} {card.back}
          <span onClick={() => removeCard([card.card_id])}> x </span>
        </div>
      ))
  )


}

export default connect(state => state)(Cards);

