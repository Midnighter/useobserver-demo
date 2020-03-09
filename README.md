# `userObserver` Demo

A tiny project that demonstrates how to use
[mobx-state-tree](https://mobx-state-tree.js.org/) (MST) as a global store,
pass parts of the store to child components via props, and make them
observable using the `useObserver` hook from
[mobx-react-lite](https://mobx-react.js.org/).

- All code related to the MST store can be found in [`src/store.tsx`](src/store.tsx).
- The entire app is contained in [`src/App.tsx`](src/App.tsx).

## Copyright

- Copyright © 2020, Moritz E. Beber.
- Free software distributed under the [Apache Software License
  2.0](https://www.apache.org/licenses/LICENSE-2.0).
