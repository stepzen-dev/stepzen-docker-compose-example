const fetch = require('node-fetch')
const API_KEY = process.env.API_KEY
async function graphql(query) {
    const response = await fetch(
        'http://stepzen:9000/api/financial/__graphql',
        {
          method: 'POST',
          headers: {
              'Host': 'graphql.local.net',
              'Authorization': `Apikey ${API_KEY}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              'query': query
          }),
        })
    const json = await response.json()
    if (json.data) {
        return json.data
    } else {
        throw new Error(`GraphQL error: ${JSON.stringify(json.errors)}`)
    }
}
async function report() {
    const portfolio = (await graphql('query { getPortfolioList { symbol nshares} }')).getPortfolioList
    portfolio.forEach(async ({symbol, nshares}) => {
        const price = (await graphql(`query { getQuote(symbol: "${symbol}") { price } }`)).getQuote.price
        console.log(`${symbol} ${nshares} ${(nshares * price).toFixed(2)}`)
    })
}
report()
