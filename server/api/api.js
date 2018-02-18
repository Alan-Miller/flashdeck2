// const { DB_STRING } = require('dotenv').config().parsed

// const api = require('express')()

// require('massive')(DB_STRING).then(db => api.set('db', db))

// const userID = 1



// /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
//   API endpoints
// /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// api.get('/cards', (req, res) => {
//   api.get('db').get_cards_by_user_id([userID]).then(cards => {
//     res.status(200).send(cards)
//   })
// })

// api.get('/decks', (req, res) => {
//   api.get('db').get_decks_by_user_id([userID]).then(decks => {
//     res.status(200).send(decks)
//   })
// })

// api.post('/decks', (req, res) => {
//   api.get('db').make_deck([userID, req.body.deckName]).then(decks => {
//     res.status(200).send(decks)
//   })
// })

// api.delete('/decks/:deckID', (req, res) => {
//   api.get('db').delete_deck([userID, req.params.deckID]).then(decks => {
//     res.status(200).send(decks)
//   })
// })

// api.post('/cards', (req, res) => {
//   let promises = req.body.cards.map(card => {
//     return api.get('db').make_card([userID, card.front, card.back])
//       .then(cards => cards)
//   })
//   Promise.all(promises).then(cards => {
//     res.status(200).send(cards[0])
//   }).catch(err => console.log(err))
// })

// api.delete('/cards', (req, res) => {
//   let promises = req.body.cardIDs.map(cardID => {
//     return api.get('db').delete_card([userID, cardID])
//       .then(cards => cards)
//   })
//   Promise.all(promises).then(cards => {
//     res.status(200).send(cards[0])
//   }).catch(err => console.log(err))
// })

// module.exports = api