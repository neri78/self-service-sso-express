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

2. [Register Regular Web Applications](https://auth0.com/docs/get-started/auth0-overview/create-applications/regular-web-apps) on Auth0.

3. Rename `.env.example` to `.env` and replace the following values. 

- `CLIENT_ID` - your Auth0 application client id
- `ISSUER_BASE_URL` - absolute URL to your Auth0 application domain (ie: `https://accountName.auth0.com`)
- `SECRET` - a randomly rengerated string. You can generate one on the command line with the following `openssl rand -hex 32`

```bash
mv .env.example .env
```

3. Run the app:

```bash
npm start
```

The sample app will be served at `localhost:3000`.


## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.