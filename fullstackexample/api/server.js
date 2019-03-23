// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const postRoute = require('./post.route');
const typeRoute = require('./type.route')
const wikiRoute = require('./wiki.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/posts', postRoute);

//Type test routes
app.use('/sessions', typeRoute);

// Wiki Search Section
app.use('/wiki', wikiRoute);

// function findWiki(req, res) {
//   var wikidata = req.body;
//   // Use child_process.spawn method from
//   // child_process module and assign it
//   // to variable spawn
//   var spawn = require("child_process").spawn;
//
//   var process = spawn('python',["./wiki.py", wikidata.search]);
//
//   // Takes stdout data from script which executed
//     // with arguments and send this data to res object
//     process.stdout.on('data', function(data) {
//         // res.send(JSON.parse(data.toString())); //can be used once take foreign characters out of data
//         var regex = /[\s\w\[\]\-:()'"\.,&]+/g;
//         var modifiedData = data.toString().match(regex);
//         wikidata.content = modifiedData.toString().replace(/(\\n)/g, '');
//         res.json(wikidata);
//     });
// }

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});
