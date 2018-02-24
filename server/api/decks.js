const decks = require('express')()

require('../massive').then(db => decks.set('db', db))

const userID = 1

const handleError = require('../utilities/handleError')
const getCardsAndDecks = require('../utilities/getCardsAndDecks')


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  /api/decks endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// MAKE A NEW DECK
decks.post('', (req, res) => {
  decks.get('db').create_deck([userID, req.body.deckName])
    .then(resp => {
      decks.get('db').get_cards_and_decks([userID])
        .then(cardsAndDecks => { res.status(200).send(cardsAndDecks) })
    })
    .catch(handleError('Error making new deck:'))
})

// ADD CARDS TO DECK
decks.post('/:deckID', (req, res) => {
  let promises = req.body.cardIDs.map(cardID => {
    return decks.get('db').add_cards_to_deck([userID, cardID, req.params.deckID])
      .then(resp => resp)
      .catch(handleError())
  })
  Promise.all(promises)
    .then(getCardsAndDecks(req, res))
    .catch(handleError('Error adding cards to deck:'))
})

// DELETE DECK
decks.delete('/:deckID', (req, res) => {
  decks.get('db').delete_deck([userID, req.params.deckID])
    .then(resp => {
      decks.get('db').get_cards_and_decks([userID])
        .then(cardsAndDecks => { res.status(200).send(cardsAndDecks) })
    })
    .catch(handleError('Error deleting deck:'))
})

// SWAP CURRENT DECK IN PLAY MODE
decks.patch('/:deckID/mode/:mode', (req, res) => {
  const edit_mode = `edit_${req.params.mode}_mode`
  decks.get('db')[edit_mode]([userID, req.params.deckID])
    .then(user => { res.status(200).send(user[0]) })
    .catch(handleError('Error swapping deck:'))
})

module.exports = decks