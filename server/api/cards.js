const cards = require('express')()

require('../massive').then(db => cards.set('db', db))

const userID = 1


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  /api/cards endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

cards.get('', (req, res) => {
  cards.get('db').get_cards_and_decks([userID]).then(cards => {
    res.status(200).send(cards)
  })
})

cards.post('', (req, res) => {
  let promises = req.body.cards.map(card => {
    return cards.get('db').make_card([userID, card.front, card.back])
      .then(cards => cards)
  })
  Promise.all(promises).then(resp => {
    cards.get('db').get_cards_and_decks([userID]).then(cards => {
      console.log("CARDS", cards)
      res.status(200).send(cards)
    })
  }).catch(err => console.log(err))
})

cards.delete('', (req, res) => {
  let promises = req.body.cardIDs.map(cardID => {
    return cards.get('db').delete_card([userID, cardID])
      .then(cards => cards)
  })
  Promise.all(promises).then(cards => {
    res.status(200).send(cards[0])
  }).catch(err => console.log(err))
})

module.exports = cards