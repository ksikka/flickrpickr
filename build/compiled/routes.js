// Routes

// TODO import stuff needed by routes here.
// like packages, modules, models.
//

function bindTo(app) {

  
  
  app.get('/', function (req, res) {
    res.render('Homepage');
});
  
  
  app.get('/rowcol', function (req, res) {
    res.render('');
});
  
  
  app.post('/api/Picture/randomNFromFlickr', function (req, res) {
    var Picture = require('./models/Picture').Picture;
    var whenDone = function(e, d) { res.send({error:e, data:d}); };
    var args = req.body;
    args.push(whenDone);
    Picture.randomNFromFlickr.apply(Picture, args);
});
  
  
  app.post('/api/Picture/createPicture', function (req, res) {
    var Picture = require('./models/Picture').Picture;
    var whenDone = function(e, d) { res.send({error:e, data:d}); };
    var args = req.body;
    args.push(whenDone);
    Picture.createPicture.apply(Picture, args);
});
  
  
  app.post('/api/Picture/findPicture', function (req, res) {
    var Picture = require('./models/Picture').Picture;
    var whenDone = function(e, d) { res.send({error:e, data:d}); };
    var args = req.body;
    args.push(whenDone);
    Picture.findPicture.apply(Picture, args);
});
  
  
  app.post('/api/User/signup', function (req, res) {
    var User = require('./models/User').User;
    var whenDone = function(e, d) { res.send({error:e, data:d}); };
    var args = req.body;
    args.push(whenDone);
    User.signup.apply(User, args);
});
  

}

exports.bindTo = bindTo;
