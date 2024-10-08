# Onlineweb Frontend

Onlineweb Frontend is the next step in the evolution of Onlineweb.
It is a self contained front-end for the main pages of Linjeforeningen Online.

The main aim of the project is to serve as a hub for Online members.
Other tasks, such as administration of website content, and general information for new student, companies or others will be spun out as their own projects entirely.

## How to run

```bash

git clone <repo>

npm ci --legacy-peer-deps

npm run dev
```

### Connecting to non-production Onlineweb4

To connect to another instance of Onlineweb4 than the production environment, you will have to set an environment variable:

```bash
export OW4_ADDRESS='http://<ip-address>:<port>'
```

## Linting

Builds will fail if our requirements for code style is not met. To ensure that you adhere to our code guidelines, we recommend you run linting tools locally before pushing your code. Running `npm run lint` and `npm run lint-less` will run our lints. Look to package.json for more specific commands.

Running linters manually at every change can be quite inefficient, which is why we recommend using editors that support linting your code as you go. For TypeScript we use [ESLint](https://eslint.org/). Correspondingly, we use [stylelint](https://stylelint.io) for our stylesheets, with editor plugins available [here](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/complementary-tools.md#editor-plugins).

## Our recommendation

In dotkom, we find that [Visual Studio Code](https://code.visualstudio.com/) is a great editor that is well suited for contributing to onlineweb-frontend. It'll come with support for ESLint out of the box, and can be set up to run stylelint easily. We recommend it to our beginners who don't want to spend a lot of time setting up the plugins or extensions mentioned above, or don't have any preferences of their own yet.

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
