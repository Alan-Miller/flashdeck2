const userID = 1

module.exports = (req, res) => resp => {
  return req.app.get('db').get_cards_and_decks([userID])
    .then(cardsAndDecks => { res.status(200).send(cardsAndDecks) })
}