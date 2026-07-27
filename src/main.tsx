import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import type { Task } from './types'

// eslint-disable-next-line react-refresh/only-export-components
const DATA: Task[] = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

// TypeScript cannot know this element exists; `!` is us promising it does.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
)
