const { DB_STRING } = require('dotenv').config().parsed

module.exports = require('massive')(DB_STRING)