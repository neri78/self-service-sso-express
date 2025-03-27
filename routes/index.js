var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const { ManagementClient } = require('auth0');

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
 
  // Initialize an instance for the Management API Client
  const management = new ManagementClient({
    domain: process.env.AUTH0_MANAGEMENT_CLIENT_DOMAIN,
    clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
  });


  let dashboardContext = {}

  // Get a list of Self Service Profile
  const ssProfilesResponse = await management.selfServiceProfiles.getAll();

  let ssoProfiles = [];
  
  ssProfilesResponse.data.forEach(profile => {
    ssoProfiles.push({
      id: profile.id,
      name: profile.name
    });
  });

  dashboardContext = { ...dashboardContext, ssoProfiles: ssoProfiles};

  
  // Get a list of Connections
  const clientsResponse = await management.clients.getAll({
    app_type: 'regular_web'
  });

  let clients = [];

  clientsResponse.data.forEach(client => {
    clients.push({
      client_id: client.client_id,
      name: client.name
    });
  })

  dashboardContext = { ...dashboardContext, clients: clients};
  
  res.render('dashboard', {
    title: 'Admin Dashboard',
    dashboardContext: dashboardContext,
  });
});

router.post('/dashboard', /* requiresAuth() , */ async function (req, res, next) {
 
  // Initialize an instance for the Management API Client
  const management = new ManagementClient({
    domain: process.env.AUTH0_MANAGEMENT_CLIENT_DOMAIN,
    clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
  });

  // build options to generate a ticket for connection creation
  
  // request parameters
  const requestParameters = {
      id: req.body.profile_id
  };

  // body parameters 
  let bodyParameters = {
    connection_config: {
      name: req.body.connection_name
    },
  };

  // If optional parameter (enabled clients) is set
  if (req.body.enabled_clients) {
    let enabled_clients;

    Array.isArray(req.body.enabled_clients)? 
      enabled_clients = req.body.enabled_clients:
      enabled_clients = new Array(req.body.enabled_clients);

    bodyParameters = {...bodyParameters, enabled_clients: enabled_clients}
  };
  
  // generate a self sertvice sso ticket
  let ssoTicket = await management.selfServiceProfiles.createSsoTicket(
    requestParameters,
    bodyParameters
  )
    
  res.render('dashboard', {
    title: 'Admin Dashboard',
    dashboardContext: undefined,
    ticketURL: ssoTicket.data.ticket
  });
});

module.exports = router;