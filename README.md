# Onlineweb Frontend

Onlineweb Frontend is the next step in the evolution of Onlineweb.
It is a self contained front-end for the main pages of Linjeforeningen Online.

The main aim of the project is to serve as a hub for Online members.
Other tasks, such as administration of website content, and general information for new student, companies or others will be spun out as their own projects entirely.

## How to run

``` bash

git clone <repo>

yarn

yarn dev
```

### Connecting to non-production Onlineweb4

To connect to another instance of Onlineweb4 than the production environment, you will have to set an environment variable:
``` bash
export OW4_ADDRESS='http://<ip-address>:<port>'
```

To enable login/authentication through our backend, you'll need a client ID locally. You can add a client in the OW4 Django admin site. Under the app "OpenID Connect Provider", add a new client to "Clients" with the following parameters:
- **Name**: doesn't matter
- **Client Type**: Public
- **Response types**: id_token token (Implicit Flow)
- **Redirect URIs**: http://localhost:3000/auth/callback
- **JWT Algorithm**: RS256 (default)

After you save the client, it will have generated a client ID, which you will use in the following environment variables:

``` bash
export OW4_SSO_CLIENT_ID='<your-client-id>'
export OW4_SSO_CALLBACK='http://localhost:3000/auth/callback'
```

Finally, you'll want to generate an RSA key for authentication. The following command in OW4 will handle that:
```bash
docker-compose run --rm django python manage.py creatersakey
```

You should now be able to log in to OWF using OW4!

## Linting

Builds will fail if our requirements for code style is not met. To ensure that you adhere to our code guidelines, we recommend you run linting tools locally before pushing your code. Running `yarn lint` and `yarn lint-less` will run our lints. Look to package.json for more specific commands.

Running linters manually at every change can be quite inefficient, which is why we recommend using editors that support linting your code as you go. For TypeScript, we use [TSLint](https://palantir.github.io/tslint/), with editor plugins available [here](https://palantir.github.io/tslint/usage/third-party-tools/). Correspondingly, we use [stylelint](https://stylelint.io) for our stylesheets, with editor plugins available [here](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/complementary-tools.md#editor-plugins).

## Our recommendation
In dotkom, we find that [Visual Studio Code](https://code.visualstudio.com/) is a great editor that is well suited for contributing to onlineweb-frontend. It'll come with support for TSLint out of the box, and can be set up to run stylelint easily. We recommend it to our beginners who don't want to spend a lot of time setting up the plugins or extensions mentioned above, or don't have any preferences of their own yet.

You could also install the [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). In your settings.json, you can add the following:
```
"[less]": {
    "editor.formatOnSave": true
},
"[typescriptreact]": {
    "editor.formatOnSave": true
},
"less.validate": false,
```

This will enable prettier to auto-format on save for less and typescriptreact (.tsx files), and make sure that the stylelint linter is ran instead of the built-in validators
