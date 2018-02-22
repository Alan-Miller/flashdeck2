const decks = require('express')()

require('../massive').then(db => decks.set('db', db))

const userID = 1


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  /api/decks endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// MAKE A NEW DECK
decks.post('', (req, res) => {
  decks.get('db').create_deck([userID, req.body.deckName]).then(decks => {
    res.status(200).send(decks)
  })
})

// ADD CARDS TO DECK
decks.post('/:deckID', (req, res) => {
  console.log("ID", userID)
  console.log("deckID", req.params.deckID)
  let promises = req.body.cardIDs.map(cardID => {
    console.log("cardID", cardID)
    return decks.get('db').add_cards_to_deck([userID, cardID, req.params.deckID]).then(decks => decks)
  })
  Promise.all(promises).then(resp => {
    decks.get('db').get_cards_and_decks([userID]).then(decks => {
      res.status(200).send(decks)
    })
  }).catch(err => console.log(err))
})

// REMOVE CARDS FROM DECK
decks.delete('/:deckID', (req, res) => {
  let promises = req.body.cardIDs.map(cardID => {
    return decks.get('db').remove_cards_from_deck([userID, cardID, req.params.deckID]).then(decks => decks)
  })
  Promise.all(promises)
    .then(resp => {
      decks.get('db').get_cards_and_decks([userID])
        .then(decks => { res.status(200).send(decks) })
    })
    .catch(err => console.log(err))
})

// DELETE DECK
decks.delete('/:deckID', (req, res) => {
  decks.get('db').delete_deck([userID, req.params.deckID])
    .then(decks => { res.status(200).send(decks) })
})

// SWAP CURRENT DECK IN PLAY MODE
decks.patch('/:deckID/mode/:mode', (req, res) => {
  const edit_mode = `edit_${req.params.mode}_mode`
  decks.get('db')[edit_mode]([userID, req.params.deckID])
    .then(user => { res.status(200).send(user[0]) })
})

module.exports = decks