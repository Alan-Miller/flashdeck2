export default {

  flipPosition: e => {
    const card = e.target.parentNode
    // card.className = card.className === "card" ? "card flipped" : "card flipped" ? "card" : card.className
    card.className = /flipped/.test(card.className) ?
      card.className.replace(" flipped", "")
      : card.className + " flipped"
  }

}