const decks = require('express')()

require('../massive').then(db => decks.set('db', db))

const userID = 1



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  /api/decks endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

decks.get('', (req, res) => {
  decks.get('db').get_decks_by_user_id([userID]).then(decks => {
    res.status(200).send(decks)
  })
})

decks.post('', (req, res) => {
  decks.get('db').make_deck([userID, req.body.deckName]).then(decks => {
    res.status(200).send(decks)
  })
})

decks.delete('/:deckID', (req, res) => {
  decks.get('db').delete_deck([userID, req.params.deckID]).then(decks => {
    res.status(200).send(decks)
  })
})

module.exports = decks