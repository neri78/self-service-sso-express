# Self Service SSO Express

This sample demonstrates [Self Service SSO](https://auth0.com/docs/authenticate/enterprise-connections/self-service-SSO) feature on Auth0. Also this sample application is built based on [auth0-express-webapp-sample](https://github.com/auth0-samples/auth0-express-webapp-sample)

Please read [Unlock Enterprise Readiness: How to Add Self-Service SSO to Your SaaS App](https://auth0.com/blog/how-to-add-self-service-sso-to-your-nodejs-saas-app/) for more deails.

## Requirements

- > Node v18


## To run this application


1. Install the dependencies with npm:

```bash
npm install
```

2. [Register Regular Web Applications](https://auth0.com/docs/get-started/auth0-overview/create-applications/regular-web-apps) on your Auth0 tenant. 

3. Follow __Provide access to the Management API for your application__ section in [this blog post](https://auth0.com/blog/how-to-add-self-service-sso-to-your-nodejs-saas-app/) to registar a Machine to Machine (M2M) Application and authorize the Auth0 Management API with the following permissions:
- read:selfserviceprofiles
- read:clients
- create:ssoaccesstickets

4. Rename `.env.example` to `.env` or create the file with the following variables:

```
CLIENT_ID=
ISSUER_BASE_URL=
SECRET=
PORT=3000
AUTH0_MANAGEMENT_CLIENT_DOMAIN=
AUTH0_MANAGEMENT_CLIENT_ID=
AUTH0_MANAGEMENT_CLIENT_SECRET=
```

- `CLIENT_ID` - your Auth0 Regular Web application's client id.
- `ISSUER_BASE_URL` - absolute URL to your Auth0 Regular Web application's domain (ie: `https://accountName.auth0.com`).
- `SECRET` - a randomly rengerated string. You can generate one on the command line with the following `openssl rand -hex 32`.
- `AUTH0_MANAGEMENT_CLIENT_DOMAIN` - your Auth0 M2M application's domain without `https://` (ie: `accountName.auth0.com`).
- `AUTH0_MANAGEMENT_CLIENT_ID` - your Auth0 M2M application's client id.
- `AUTH0_MANAGEMENT_CLIENT_SECRET` - your Auth0 M2M application's client secret.

5. Run the app:

```bash
npm start
```

The sample app will be served at `localhost:3000`.


## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.