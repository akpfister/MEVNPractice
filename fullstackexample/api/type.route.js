// type.model.js

const express = require('express');
const typeRoutes = express.Router();

// Require Post model in our routes module
let Session = require('./type.model');

// Store Session route
typeRoutes.route('/add').post(function (req, res) {
  let session = new Session(req.body);
  session.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});


// Get Sessions route
typeRoutes.route('/').get(function (req, res) {
  Session.find(function(err, sessions) {
    if(err){
      res.json(err);
    } else {
      res.json(sessions);
    }
  });
});

// Delete Individual Sessions
typeRoutes.route('/delete/:id').delete(function (req, res) {
    Session.findOneAndDelete({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else {
          console.log("HERE");
          res.json('Successfully removed');
        }
    });
});

// Helper Function
function removeDecimal(value) {
  if((value % 1) >= .5) {
    value = Math.ceil(value)
  } else {
    value = Math.floor(value);
  }
  return value;
}

// Get All Time Statistics
typeRoutes.route('/alltime').get(function (req, res) {
  Session.find(function(err, sessions) {
    if(err){
      res.json(err);
    } else {
      var time = 0;
      var wc = 0;
      var typos = 0;
      sessions.forEach(function(session) {
        time += session.totalTime;
        wc += session.words_correct;
        typos += session.typos;
      });
      time = time/60;
      time = removeDecimal(time);

      var wpm = wc/time;
      wpm = removeDecimal(wpm);

      var score = (wc-typos)/time;
      score = removeDecimal(score);

      var alltime = {
        time: time,
        wc: wc,
        typos: typos,
        wpm: wpm,
        score: score
      };
      console.log(alltime);
      res.json(alltime);
    }
  });
});

// Get Data for Graph
typeRoutes.route('/graph').get(function (req, res) {
  Session.find(function(err, sessions) {
    if(err){
      res.json(err);
    } else {
      var labels = [];
      var data = [];
      sessions.forEach(function(session) {
        labels.push(session.totalTime.toString());
        data.push(session.words_correct);
      });
      labels.sort((a, b) => a - b);
      data.sort((a, b) => a - b);
      graph = {
        labels: labels,
        data: data
      };
      console.log(graph);
      res.json(graph);
    }
  });
});


module.exports = typeRoutes;
