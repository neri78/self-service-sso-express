var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const getManagementClient = require('../helpers/auth0ManagementClient');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2)
  });
});

router.get('/dashboard', requiresAuth() ,async function (req, res, next) {
    
  res.render('dashboard', {
    title: 'Admin Dashboard',
    ticketURL: undefined
  });
});

router.post('/dashboard', requiresAuth() , async function (req, res, next) {

  // get an instance of the ManagementClient.
  const management = getManagementClient();

  // get a list of Self-Service Profiles.
  const { data: ssoProfiles } = await management.selfServiceProfiles.getAll();

  // use the 1st profile in this sample.
  const ssoProfile = ssoProfiles[0];
 
  const requestParameters = {
    id: ssoProfile.id
  };

  let bodyParameters = {};

  const action = req.body.action;

  if (action === 'create') {
      // build bodyParameter for 'create a connection'.
      bodyParameters = {
          ...bodyParameters,
          connection_config: { name: `self-service-sso-${Date.now()}` },
          enabled_clients: [process.env.CLIENT_ID]
      }
  } else if (action === 'edit') {
      // build bodyParameter for 'edit a connection'.
      // 👇 add code
      // get connections for the current client
      const { data: enabledConnections } = await management.clients.getEnabledConnections({
          client_id: process.env.CLIENT_ID
      });

      // filter a connection with the name and use the first item for this sample.
      const ssoConnection = enabledConnections.connections.filter(connection => {
      return connection.name.includes('self-service-sso-')
      })[0];

      // add connection_id to the bodyParameter.
      bodyParameters = {
          ...bodyParameters,
          connection_id: ssoConnection.id
      };
      // 👆 add code
  }
  
  // generate a Self-Service SSO ticket.
  const { data: ssoTicket } = await management.selfServiceProfiles.createSsoTicket(
    requestParameters,
    bodyParameters
  );

  res.render('dashboard', {
    title: 'Admin Dashboard',
    ticketURL: ssoTicket.ticket
  });
});

module.exports = router;