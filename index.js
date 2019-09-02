require('isomorphic-fetch');
require('now-env');

const { parse } = require('url');
const { send } = require('micro');

module.exports = async (req, res) => {
  const { query } = parse(req.url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', "text/plain; charset='UTF-8'; charset='utf-8'");
  const requestUrl = `http://opengtindb.org?queryid=${process.env.API_KEY}&cmd=query&ean=${query}`;
  fetch(requestUrl)
    .then(response => response.text())
    .then(data => {
      send(res, 200, data);
    })
    .catch(error => {
      send(res, 500, error);
    });
};
