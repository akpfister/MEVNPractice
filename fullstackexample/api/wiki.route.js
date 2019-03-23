// post.model.js

const express = require('express');
const wikiRoutes = express.Router();

// var PythonShell = require('python-shell');
let {PythonShell} = require('python-shell');

wikiRoutes.route('/search').post(function (req, res) {
  // if (err) throw err;
  var search = req.body.query;
  console.log(search);
  let wikidata = {};

  let options = {
    mode: 'text',
    pythonPath: '/Users/AaronPfister/Desktop/CSCI490/FullStackPractice/AppDividendTutorial/mevnexample/api/venv/bin/python',
    pythonOptions: [],
    scriptPath: '/Users/AaronPfister/Desktop/CSCI490/FullStackPractice/AppDividendTutorial/mevnexample/api',
    args: [search]
  }

  PythonShell.run('wiki.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    // console.log('results: %j', results);
    var regex = /[\s\w\[\]\-:()'"\.,&]+/g;
    var modifiedData = results.toString().match(regex);
    var data = modifiedData.toString().replace(/(\\n)/g, '');
    wikidata = {
      content: data
    };
    res.json(wikidata);
  });

});

module.exports = wikiRoutes;
