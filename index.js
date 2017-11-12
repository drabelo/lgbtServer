var express = require('express')
var app = express()
var craigslist = require('node-craigslist');
var options = {
    category : 'roo',
    bundleDuplicates: true
  };

app.get('/listings', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var listings;
  var client = new craigslist.Client({
      city : req.query.city
    });

  client
    .search(options, 'gay')
    .then((listings) => {
      // filtered listings (by price)
      var detailedListings = [];
      listings.forEach((listing) => {
        detailedListings.push(client.details(listing))
      });
      return Promise.all(detailedListings)
    })
    .then((listings) => {
      console.log("Sending back listings", listings)
      res.send(listings);
    })
    .catch((err) => {
      res.send("No results from craigslist");
    });
})

app.listen(3001, () => console.log('Example app listening on port 3000!'))
