var util = require('util');

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

  app.all('/condition', addon.authenticate(), function(req, res) {
    console.log(req.get('Authorization'));
    res.json({
      shouldDisplay: true
    });
  });

  app.get('/configure', addon.authenticate(), function(req, res) {
    res.render('configure', {
      title: 'Atlassian Connect'
    });
  });

  app.get('/conditions/hello-world', addon.authenticate(), function(req, res) {
    res.render('conditions/hello-world', {
      shouldDisplay: "true"
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
      userKey: req.param('user_key'),
      userName: req.param('user_id'),
      lic: req.param('lic'),
      loc: req.param('loc'),
      tz: req.param('tz'),
      link: req.param('link'),
      startIssue: req.param('startIssue'),
      endIssue: req.param('endIssue'),
      totalIssues: req.param('totalIssues'),
      issues: req.param('issues')
    });
  });

  app.post('/created', function(req, res) {
      var issueKey = req.body.issue.key;
      var summary  = req.body.issue.fields.summary;
      var type     = req.body.issue.fields.issuetype.name;
      console.log("Issue created", issueKey, summary, type);
      res.send(200);
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