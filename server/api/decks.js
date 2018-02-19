const decks = require('express')()

require('../massive').then(db => decks.set('db', db))

const userID = 1


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  /api/decks endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

decks.post('', (req, res) => {
  decks.get('db').make_deck([userID, req.body.deckName]).then(decks => {
    res.status(200).send(decks)
  })
})

decks.put('/:deckID', (req, res) => {
  let promises = req.body.cardIDs.map(cardID => {
    return decks.get('db').put_cards_in_deck([userID, cardID, req.params.deckID]).then(decks => decks)
  })
  Promise.all(promises).then(resp => {
    decks.get('db').get_cards_and_decks([userID]).then(decks => {
      res.status(200).send(decks)
    })
  }).catch(err => console.log(err))
})

decks.delete('/:deckID', (req, res) => {
  decks.get('db').delete_deck([userID, req.params.deckID]).then(decks => {
    res.status(200).send(decks)
  })
})

module.exports = decks