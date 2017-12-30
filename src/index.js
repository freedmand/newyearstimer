import App from './components/app.html';
import {Store} from 'svelte/store.js';

// Populate this store if there is a pending transaction, like Reddit
// verification.
const store = new Store();
store.set({step: 1, id: null, playing: false, vote: null, authFailed: false});

/**
 * Populates a map of query variables and their values. Adapted from
 * https://css-tricks.com/snippets/javascript/get-url-variables/.
 * @return {!Map<string, string>} A map of query keys and their values.
 */
function getQueryMap() {
  const map = new Map();
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    map.set(pair[0], decodeURIComponent(pair[1]));
  }
  return map;
}

const queryVariables = getQueryMap();
if (queryVariables.has('state') && queryVariables.has('code')) {
  const postVariables = JSON.parse(localStorage.getItem('newyearstimer-redditPost'));
  const random = postVariables.random;
  if (queryVariables.get('state').trim() != random.trim()) {
    const voteVariables = JSON.parse(localStorage.getItem('newyearstimer-redditVote'));
    const voteRandom = voteVariables.random;
    if (queryVariables.get('state').trim() != voteRandom.trim()) {
      throw new Error('Invalid state. Bad request');
    }
    // Proceed to show notice that you can vote.
    store.set({
      code: queryVariables.get('code'),
    });
  } else {
    store.set({
      id: postVariables.id,
      title: postVariables.title,
      event: postVariables.event,
      countdown: postVariables.countdown,
      time: postVariables.time,
      code: queryVariables.get('code'),
      step: 4,
    });
  }

  // Set the URL back to normal.
  if (history.pushState) {
    const path = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState({path}, '', path);
  }
}
if (queryVariables.has('v') && queryVariables.has('end')) {
  store.set({
    playing: true,
    playbackId: queryVariables.get('v'),
    playbackEnd: queryVariables.get('end'),
  });
}

const app = new App({
  target: document.getElementById('app'),
  store,
});

const welcome = document.getElementById('mainWelcome');
store.observe('playing', (playing) => {
  welcome.style.display = playing ? 'none' : 'block';
});
