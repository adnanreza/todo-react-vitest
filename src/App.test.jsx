import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// The same starter tasks the app ships with in main.jsx.
const TASKS = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

// Every test starts the same way: render the app fresh, get a "user"
// that can type and click like a person would.
function renderApp() {
  render(<App tasks={TASKS} />);
  return userEvent.setup();
}

test("renders the app with the starter tasks", () => {
  renderApp();

  expect(
    screen.getByRole("heading", { name: "TodoMatic" })
  ).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "Eat" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "Sleep" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "Repeat" })).not.toBeChecked();
  expect(
    screen.getByRole("heading", { name: "3 tasks remaining" })
  ).toBeInTheDocument();
});

test("adds a task", async () => {
  const user = renderApp();

  await user.type(
    screen.getByRole("textbox", { name: "What needs to be done?" }),
    "Walk the dog"
  );
  await user.click(screen.getByRole("button", { name: "Add" }));

  expect(
    screen.getByRole("checkbox", { name: "Walk the dog" })
  ).not.toBeChecked();
  expect(
    screen.getByRole("heading", { name: "4 tasks remaining" })
  ).toBeInTheDocument();
});

test("toggles a task's completed state", async () => {
  const user = renderApp();

  await user.click(screen.getByRole("checkbox", { name: "Sleep" }));

  expect(screen.getByRole("checkbox", { name: "Sleep" })).toBeChecked();
  // Completing a task does not remove it from the list.
  expect(
    screen.getByRole("heading", { name: "3 tasks remaining" })
  ).toBeInTheDocument();
});

test("deletes a task", async () => {
  const user = renderApp();

  await user.click(screen.getByRole("button", { name: "Delete Repeat" }));

  expect(
    screen.queryByRole("checkbox", { name: "Repeat" })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "2 tasks remaining" })
  ).toBeInTheDocument();
});

test("renames a task", async () => {
  const user = renderApp();

  await user.click(screen.getByRole("button", { name: "Edit Sleep" }));
  await user.type(
    screen.getByRole("textbox", { name: "New name for Sleep" }),
    "Nap"
  );
  // The Save button's label is split across a visually-hidden span, and
  // the accessible-name algorithm strips the space between the parts
  // ("Savenew name for Sleep"). A regex matcher shrugs at that.
  await user.click(screen.getByRole("button", { name: /save/i }));

  expect(screen.getByRole("checkbox", { name: "Nap" })).toBeInTheDocument();
  expect(
    screen.queryByRole("checkbox", { name: "Sleep" })
  ).not.toBeInTheDocument();
});

test("filters tasks by status", async () => {
  const user = renderApp();

  // The filter labels are assembled from visually-hidden spans, and the
  // accessible-name algorithm squeezes out the spaces between them
  // ("ShowCompletedtasks"), so these matchers use one solid word each.
  await user.click(screen.getByRole("button", { name: /completed/i }));
  expect(screen.getByRole("checkbox", { name: "Eat" })).toBeInTheDocument();
  expect(
    screen.queryByRole("checkbox", { name: "Sleep" })
  ).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /active/i }));
  expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  expect(
    screen.queryByRole("checkbox", { name: "Eat" })
  ).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /all/i }));
  expect(screen.getAllByRole("checkbox")).toHaveLength(3);
});
