const { ManagementClient } = require('auth0');

let management = null; 

function getManagementClient() {
  if (!management) {

    // Initialize an instance of the Management API Client
    management = new ManagementClient({
      domain: process.env.AUTH0_MANAGEMENT_CLIENT_DOMAIN,
      clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
      clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    });
  }
  return management;
}

module.exports = getManagementClient;