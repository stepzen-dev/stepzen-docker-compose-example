const express = require('express')
express()
  .use(express.json())
  .post("/", (request, response) => {
    const json = request.body
    if (json.symbol && json.symbol.length > 1) {
      response.send({
        'symbol': json.symbol,
        'price': (Math.random() * 1000).toFixed(2)
      })
    } else {
      response.status(500).send({
          'error': 'Unable to obtain quote'
      })
    }})
  .listen(80)
