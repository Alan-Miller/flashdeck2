export default {

  flipCard: e => {
    const card = e.target.parentNode
    // card.className = card.className === "card" ? "card flipped" : "card flipped" ? "card" : card.className
    card.className = /flipped/.test(card.className) ?
      card.className.replace(" flipped", "")
      : card.className + " flipped"
  },

  pilePosition: (index, propsIndex, numCards) => {
    const leftPile = { left: '-250px', zIndex: index }
    const middlePile = { left: '0px', zIndex: numCards }
    const rightPile = { left: '250px', zIndex: (numCards - index) }

    if (index < ~~propsIndex) return leftPile;
    if (index === ~~propsIndex) return middlePile;
    if (index > ~~propsIndex) return rightPile;
  },

  flipPosition: (index, propsIndex) => {
    const frontOfCardIsShowing = { transform: 'rotateY(0deg)', transition: '1s' }
    const backOfCardIsShowing = { transform: 'rotateY(-180deg)', transition: '1s' }

    if (index < propsIndex) return backOfCardIsShowing;
    if (index > propsIndex) return frontOfCardIsShowing;
    if (index === propsIndex && propsIndex % 1 === 0) return frontOfCardIsShowing;
    if (index === propsIndex && propsIndex % 1 !== 0) return backOfCardIsShowing;
  },

  zIndex: (numCards) => {

  }

}