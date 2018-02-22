const user = require('express')()

require('../massive').then(db => user.set('db', db))

const userID = 1


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  /api/user endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// GET USER INFO
user.get('', (req, res) => {
  user.get('db').get_user([userID]).then(user => res.status(200).send(user[0]))
})

module.exports = user