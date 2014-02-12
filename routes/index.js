module.exports = function(app, addon) {
  
  app.get('/', function(req, res) {
      res.format({
        'text/html': function() {
          res.redirect('/atlassian-connect.json');
        },
        'application/json': function() {
          res.redirect('/atlassian-connect.json');
        }
      });
    }

  );

  app.get('/hello-world', addon.authenticate(), function(req, res) {
    res.render('hello-world', {
      title: 'Atlassian Connect'
    });
  });

  app.get('/configure', addon.authenticate(), function(req, res) {
    res.render('configure', {
      title: 'Atlassian Connect'
    });
  });

  app.get('/conditions/hello-world', addon.authenticate(), function(req, res) {
    //console.log(req);
    //console.log("HEADERS", req.headers);
    res.render('conditions/hello-world', {
      shouldDisplay: true
    });
  });

  app.get('/profile-tab', addon.authenticate(), function(req, res) {
    res.render('profile-tab', {
      userKey: req.param('profileUserKey'),
      userName: req.param('profileUserName')
    });
  });

  app.get('/search-view', addon.authenticate(), function(req, res) {
    res.render('search-view', {

    });
  });

  app.get('/profile-tab', addon.authenticate(), function(req, res) {
    res.render('profile-tab', {
      title: 'Atlassian Connect'
    });
  });


  app.get('/license', function(req, res) {
      var httpClient = addon.httpClient({
          clientKey: 'jira:15489595',
          userId: "admin",
          appKey: addon.key
      });

      httpClient.get({
          "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          "url": "/rest/atlassian-connect/latest/license"
      },
      function(err, response, body) {
          if (err) { 
            console.log(response.statusCode + ": " + err);
            res.send("Error: " + response.statusCode + ": " + err);
          }
          else {
              console.log(response.statusCode, body);
              res.send(body);
          }
      }
  );
  });
};