import axios from 'axios'

const initialState = {
  user: {},
  colorTheme: '',
  cardsAndDecks: [],
  cards: [{ id: 0, front: 'front', back: 'back' }],
  decks: [{ id: 0, deck_name: 'Decky' }]
}

const GET_CARDS_AND_DECKS = 'GET_CARDS_AND_DECKS'
const SET_NEW_CARDS = 'SET_NEW_CARDS'
const SET_NEW_DECKS = 'SET_NEW_DECKS'
const DELETE_CARDS = 'DELETE_CARDS'
const DELETE_DECK = 'DELETE_DECK'
const PUT_CARDS_IN_DECK = 'PUT_CARDS_IN_DECK'

export function getCardsAndDecks() {
  return {
    type: GET_CARDS_AND_DECKS,
    payload: axios.get('/api/cards').then(cards => {
      return cards.data
    })
  }
}

export function putCardsInDeck(cardIDs, deckID) {
  console.log("IDs", cardIDs, deckID)
  return {
    type: PUT_CARDS_IN_DECK,
    payload: axios.put(`/api/decks/${deckID}`, { cardIDs }).then(decks => {
      return decks.data
    })
  }
}

export function setNewCards(cards) {
  return {
    type: SET_NEW_CARDS,
    payload: axios.post('/api/cards', { cards }).then(cards => cards.data)
  }
}

export function setNewDeck(deckName) {
  return {
    type: SET_NEW_DECKS,
    payload: axios.post('/api/decks', { deckName }).then(decks => decks.data)
  }
}

export function deleteCards(cardIDs) {
  return {
    type: DELETE_CARDS,
    payload: axios.delete('/api/cards', { data: { cardIDs } }).then(cards => cards.data)
  }
}

export function deleteDeck(deckID) {
  return {
    type: DELETE_DECK,
    payload: axios.delete(`/api/decks/${deckID}`).then(decks => decks.data)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARDS_AND_DECKS + '_FULFILLED':
      return Object.assign({}, state, { cardsAndDecks: action.payload })
    case SET_NEW_CARDS + '_FULFILLED':
      return Object.assign({}, state, { cardsAndDecks: action.payload })
    case SET_NEW_DECKS + '_FULFILLED':
      return Object.assign({}, state, { cardsAndDecks: action.payload })
    case DELETE_CARDS + '_FULFILLED':
      return Object.assign({}, state, { cardsAndDecks: action.payload })
    case DELETE_DECK + '_FULFILLED':
      return Object.assign({}, state, { cardsAndDecks: action.payload })
    case PUT_CARDS_IN_DECK + '_FULFILLED':
      return Object.assign({}, state, { cardsAndDecks: action.payload })
    default:
      return state
  }
  // return (
  //   action.type === GET_CARDS_AND_DECKS ? Object.assign({}, state, { cards: action.payload })
  //     : action.type === SET_NEW_CARDS ? Object.assign({}, state, { cards: action.payload })
  //       : state
  // )
}