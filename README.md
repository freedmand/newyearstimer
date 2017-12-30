# New Year's Timer

This is the source code for [New Year's Timer](https://newyearstimer.com). It lives
at https://github.com/freedmand/newyearstimer.

## Get started

New Year's Timer is built with NodeJS. Once you have Node installed, install the
dependencies with

```bash
cd newyearstimer
npm install
```

You will need to configure your own [Reddit API key](https://github.com/reddit/reddit/wiki/OAuth2) and [YouTube Data API key](https://developers.google.com/youtube/v3/). Create a file in `src/config.js`
which is a dictionary containing these values:

```
export const API_KEYS = {
  ytdata: '...', // your YouTube Data API key
  redditClient: '...', // your Reddit app's client ID
  redditSecret: '...', // your Reddit app's secret ID
  redditRedirect: '...', // your URL to redirect to on success. Can be localhost
  // ID of flair in /r/NewYearsTimer to show countdowns by posts
  flairId: '7cf5f0e8-ec1a-11e7-8107-0ed8d186392c',
};
```

Then start the application with

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see New Year's Timer
running. Edit a component file in `src`, save it, and reload the page to see
your changes.

To build the application and minify source code, create a `dist/` folder and run

```bash
npm run build
```

## Contributions

New Year's Timer was designed and coded by Dylan Freedman.

New Year's Timer utilizes the following libraries:

* [Svelte](https://github.com/sveltejs/svelte): for implementing framework-free
components

See the [about page](https://newyearstimer.com/about.html) for more information.
