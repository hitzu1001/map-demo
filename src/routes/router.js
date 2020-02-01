const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/api/autocomplete/:query', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    const endpoint = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${process.env.API_KEY}&beginHighlight=%3Cb%3E&endHighlight=%3C/b%3E&maxresults=5&country=AUS&query=`

    axios({
        method: 'GET',
        url: endpoint + req.params.query,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        res.send(JSON.stringify(response.data));
      }).catch(error => {
        res.status(400).send(JSON.stringify(error));
      });
});

router.get('/ping', (req, res) => {
    res.send('pong')
});

router.use('/', express.static('client'))

module.exports = router;