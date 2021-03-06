# Firelist React

We'll build this app together using [Codesandbox.io](https://codesandbox.io/s/github/how-to-firebase/firelist-react/tree/master) and a git branch for each feature.

You can definitely follow along on your local machine. It will require a little more git and command-line skill, but it's all very standard stuff for Node.js development.

## Codesandbox

Simply open up the [CodeSandbox.io](https://codesandbox.io/s/github/how-to-firebase/firelist-react) project :)

You can use CodeSandbox to work on specific branches by using the following url pattern:

`https://codesandbox.io/s/github/how-to-firebase/[BRANCH_NAME]`

Just replace `BRANCH_NAME` with the name of the branch that you're working on.

## Localhost installation

Pull [the repo](https://github.com/how-to-firebase/firelist-react) directly from GitHub and install dependencies with `yarn` or `npm install`

```
git clone https://github.com/how-to-firebase/firelist-react.git
cd firelist-react
yarn
```

> We'll use [yarn](https://yarnpkg.com/) instead of [npm](https://www.npmjs.com/), but either will work fine.

If you need to check out a new branch, let's say `firebase-authentication`, you'd run the following...

```
git checkout firebase-authentication
```

And you can switch back to `master` whenever you need it.

```
git checkout master
```

Once you're on your branch, run `yarn start` to spin up the local dev server.

```
yarn start
```

Your development environment will be up and running at [http://localhost:8080](http://localhost:8080)

## Webpack

Our `yarn start` command uses [Webpack](https://webpack.js.org/) and the [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/). Webpack is great... but it has its limitations. If you find that Webpack is in a funny state, kill the `yarn start` process and run `yarn start` again to refresh your server. Sometimes that's all you'll need.

## Tooling

We're huge fans of [VSCode](https://code.visualstudio.com/) and highly recommend it for local development.

If you're using VSCode, try the [Firebase](https://github.com/toba/vsfire) extension for Firestore security rules highlighting.

## Node Versions

Cloud Functions lags in its support for Node.js. It supports one or two LTS versions back. So we'll want to run our Cloud Functions code in a very specific version of Node.js

The trick is to run `yarn add node@6.14.2 --save-exact` to install v6.14.2 locally. This doesn't affect global node versions, but any script in `package.json` will run on v6.14.2.

You can test this with a `package.json` script:

```json
"scripts": {
  "v": "node --version"
}
```

The run `yarn v`. You should see `v6.14.2` in the output.

Now our tests will ensure compatibility with Cloud Functions!

## GCP (Google Cloud Platform) APIs

You'll need to [create a service account](https://console.developers.google.com/iam-admin/serviceaccounts) that has [signBlob](https://cloud.google.com/iam/reference/rest/v1/projects.serviceAccounts/signBlob) rights in order to create thumbnail images.

You'll need to enable the [Identity and Access Management API](https://console.developers.google.com/apis/library/iam.googleapis.com/?project=firelist-react) to make image thumbnails.

While developing this application I ran into a nasty error where I couldn't upload files to Firebase Storage any longer. I solved the problem by upgrading my Firebase project to the Blaze plan and explicitly granting Storage Admin rights to `firebase-storage@system.gserviceaccount.com` as described on [this Stackoverflow answer](https://stackoverflow.com/questions/50292353/firebase-storage-security-rules-400-error-issue-permission-denied-could-not-ac).

I also ran into trouble with `iam.serviceAccounts.signBlob` permissions. That was resolved by adding the "Cloud Functions Service Agent" role to my `firelist-react@appspot.gserviceaccount.com` as recommended on [this Stackoverflow answer](https://github.com/googleapis/nodejs-storage/issues/150).

## HTTPS Required

This project includes a [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/). And Service Workers require a valid HTTPS connection.

The HTTPS requirement makes local development a real pain, because you can't ever generate a legitimate SSL certificate for localhost. We've found two ways to get around this.

1. [Start Chrome with the --ignore-certificate-errors](https://www.technipages.com/google-chrome-bypass-your-connection-is-not-private-message) switch. 
2. Open [Chrome flags](chrome://flags/) and enable #allow-insecure-localhost

Option #1 enables serving the page from any test domain. Option #2 works for localhost only.

Option #1 (--ignore-certificate-errors) is a huge pain, because it's a Chrome startup setting, which means that you have to manually open Chrome with that settings, which is a different process for both Windows and Mac.

Option #2 (#allow-insecure-localhost) is preferred in every way to #1... unless you're developing from a domain other than localhost. If that's the case... then consider serving from a [custom SSL cert with Webpack Dev Server](https://webpack.js.org/configuration/dev-server/#devserver-https).

We'll do our best to stick to localhost so that #allow-insecure-localhost will work seamlessly.
