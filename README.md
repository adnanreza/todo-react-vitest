# todo-react-vitest

MDN's TodoMatic app with a complete [Vitest](https://vitest.dev) and
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
suite: six tests covering every flow a user can perform, and nothing else changed.

Companion code for **[Testing React with Vitest](https://www.adnanreza.com/writing/testing-react-with-vitest)**,
a follow-along lab that builds this repository from a clean clone in about half
an hour. If a test will not go green on your machine, clone this and diff.

## Branches

Each branch is the finished state of one lab. None of them is work in
progress, and none of them will be merged, because the teaching material
is the difference between them.

| Branch | What it is | Where it fits |
| --- | --- | --- |
| `main` | The app in JavaScript with the six tests. | The finished state of the Vitest lab, and the starting point for the TypeScript one. Clone this either way. |
| [`typescript`](https://github.com/adnanreza/todo-react-vitest/tree/typescript) | The same app migrated to TypeScript, every assertion unchanged. | The finished state of the TypeScript lab. |

So `main` does double duty: it is the answer key if you are working
through [Testing React with Vitest](https://www.adnanreza.com/writing/testing-react-with-vitest),
and it is where you begin if you are working through
[Migrating a React app from JavaScript to TypeScript](https://www.adnanreza.com/writing/migrating-react-to-typescript).

That migration is easiest to read as a diff:
[main...typescript](https://github.com/adnanreza/todo-react-vitest/compare/main...typescript)
shows every file it touched, in one commit. The test file changes by two
lines, a type import and one annotation, while all six assertions stay
exactly as they were. That is the point: the migration changed how the
code is described, not what it does.

`typescript` will never be merged into `main`. Merging it would destroy
the comparison, and the comparison is the lesson. GitHub sometimes
offers a "Compare & pull request" button after a push to that branch;
that is GitHub noticing activity, not a suggestion worth taking.

## Run it

```bash
npm install
npm run dev       # the app, at localhost:3000
npm test          # the tests, in watch mode
npm run test:run  # the tests, once
```

## What is here

| File | Why |
| --- | --- |
| `vitest.config.js` | The whole test configuration: three settings. |
| `src/test/setup.js` | One line, registering jest-dom's assertions. |
| `src/App.test.jsx` | All six tests. |

Everything else is [mdn/todo-react](https://github.com/mdn/todo-react) exactly as
MDN's React tutorial ships it (React 18, Vite 5), left alone on purpose so the
app matches what tutorial readers already know.

## The six tests

They cover the whole app: the first render, adding a task, toggling one,
deleting one, renaming one, and filtering by status. Two of them are more
interesting than they look.

**Toggling needs two clicks.** MDN's checkbox is uncontrolled, so the browser
flips it whether or not React hears about the change. Asserting `toBeChecked()`
right after the click tests the browser rather than the app: break
`toggleTaskCompleted` entirely and that assertion still passes. Clicking the
Completed filter afterwards asks the app a question only real state can answer.

```jsx
await user.click(screen.getByRole("checkbox", { name: "Sleep" }));
await user.click(screen.getByRole("button", { name: /completed/i }));

expect(screen.getByRole("checkbox", { name: "Sleep" })).toBeInTheDocument();
```

**Two queries use a regex, for different reasons.** The Save button's label is
split between visible text and a hidden span written on the next line, and JSX
strips the whitespace between them, so its accessible name is literally
`Savenew name for Sleep`. The filter buttons keep their spaces but read
`Show Completed tasks` in full, so the visible word alone never matches.

## Queries, not internals

Every query asks for what a person would look for, like the checkbox labelled
Eat, rather than for a class name or a component's state. That is the point of
the suite: a refactor that keeps the app working should keep the tests passing.

## Licence

MPL-2.0, the same as upstream. See [LICENSE](LICENSE).
