# Atlassian Add-on using Express

Congratulations! You've successfully created an Atlassian Connect Add-on using the Express web application framework. This web app greatly simplifies the creation of Atlassian Add-ons by simplifying the following:

* Verification of JWT signatures through the use of a custom Express middleware
* JWT signing of outbound HTTP requests back to the host
* Auto registration and deregistration of your add-on in development mode
* Persistent storage of the host client information (i.e., client key, shared secret and other useful host information)
* Persistent add-on data storage through a key/value store
* Dynamic re-registration of your add-on when the atlassian-plugin.xml is modified

## What's next?

* Copy `credentials.json.sample` to `credentials.json` and fill in the blanks to enable auto registration of the add-on into your JIRA instance.
* `npm install` to install dependencies
* `npm start` to run the add-on
* For further reading, please [read the docs](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/README.md#markdown-header-install-dependencies).