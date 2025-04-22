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

  // get an instance of the ManagementClient
  const management = getManagementClient();

  // Get a list of Self Service Profiles with current 
  const ssProfilesResponse = await management.selfServiceProfiles.getAll();

  // Use the 1st profile in this sample
  const ssoProfile = ssProfilesResponse.data[0];
  
  // build options to generate a ticket for connection creation
  const requestParameters = {
    id: ssoProfile.id
  };

  // Generate connection name automatically and set current Auth0 application as an enabled client
  const bodyParameters = {
      connection_config: {
        name: `self-service-sso-${Date.now()}` 
      },
      enabled_clients: [process.env.CLIENT_ID]
  };

  // generate a self sertvice sso ticket
  const ssoTicket = await management.selfServiceProfiles.createSsoTicket(
    requestParameters,
    bodyParameters
  );

  res.render('dashboard', {
    title: 'Admin Dashboard',
    ticketURL: ssoTicket.data.ticket
  });
});

module.exports = router;