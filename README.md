# todo-react-vitest

MDN's TodoMatic app with a complete Vitest + React Testing Library
suite over every user flow: first render, add, toggle, delete, rename,
and filter.

Companion code for the article "Testing React with Vitest" at
[adnanreza.com/writing](https://www.adnanreza.com/writing), and teaching
material for my React courses.

## What this is

The app itself is [mdn/todo-react](https://github.com/mdn/todo-react)
exactly as MDN's React tutorial ships it (React 18, Vite 5), unchanged
on purpose so it matches what tutorial readers already know. Everything
added here is testing: current Vitest, jsdom, and Testing Library, one
setup file, one test file.

Licensed MPL-2.0, the same as upstream; see [LICENSE](LICENSE).

## Run it

```
npm install
npm run dev       # the app, at localhost:3000
npm test          # the tests, in watch mode
npm run test:run  # the tests, once
```

## Where the tests live

- `vitest.config.js` — the whole test configuration
- `src/test/setup.js` — registers Testing Library's extra matchers
- `src/App.test.jsx` — all six user flows, written classroom-style:
  one behaviour per test, queries by accessible role and name
