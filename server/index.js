const { SERVER_PORT } = require('dotenv').config().parsed

// Server app
const app = require('express')()
app.listen(SERVER_PORT, () => { console.log(`${SERVER_PORT}!!!`) })

// Top-level middleware
app.use(
  require('./middlewares/bodyParser'),
  require('./middlewares/logReq')
)

// APIs
const user = require('./api/user')
    , cards = require('./api/cards')
    , decks = require('./api/decks')

app.use('/api/user', user)
app.use('/api/cards', cards)
app.use('/api/decks', decks)