const cards = require('express')()

require('../massive').then(db => cards.set('db', db))

const userID = 1

const handleError = require('../utilities/handleError')
const getCardsAndDecks = require('../utilities/getCardsAndDecks')


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  /api/cards endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// GET ALL CARDS AND DECKS
cards.get('', (req, res) => {
  cards.get('db').get_cards_and_decks([userID])
    .then(cards => { res.status(200).send(cards) })
    .catch(handleError('Error getting cards and decks:'))
})


// MAKE A NEW CARD
cards.post('', (req, res) => {
  let promises = req.body.cards.map(card => {
    return cards.get('db').create_card([userID, card.front, card.back])
      .then(resp => resp)
      .catch(handleError())
  })
  Promise.all(promises)
    .then(getCardsAndDecks(req, res))
    .catch(handleError('Error making new card:'))
})


// DELETE CARDS
cards.delete('', (req, res) => {
  let promises = req.body.cardIDs.map(cardID => {
    return cards.get('db').delete_card([userID, cardID])
      .then(resp => resp)
      .catch(handleError())
  })
  Promise.all(promises)
    .then(getCardsAndDecks(req, res))
    .catch(handleError('Error deleting cards:'))
})


// REMOVE CARDS FROM DECK
cards.delete('/decks/:deckID', (req, res) => {
  let promises = req.body.cardIDs.map(cardID => {
    return cards.get('db').remove_cards_from_deck([userID, cardID, req.params.deckID])
      .then(resp => resp)
      .catch(handleError())
  })
  Promise.all(promises)
    .then(getCardsAndDecks(req, res))
    .catch(handleError('Error removing cards from deck:'))
})

module.exports = cards