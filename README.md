# Student Productivity Dashboard

A responsive React dashboard for organizing student assignments. It includes an overview, a task list, a weekly schedule, search, and a controlled form for adding assignments.

## Features
- Reusable functional components organized under `src/components`
- Props passed from the parent `App` component to child components
- State for navigation, task data, the add-task form, and task search
- Controlled form inputs for assignment name, course, due date, and priority
- Add, complete, search, and delete tasks
- Conditional rendering for Overview, Tasks, Schedule, and the add-task form
- Responsive CSS for desktop, tablet, and mobile layouts

## Run locally
1. Install Node.js (LTS).
2. Open a terminal in this project folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Component hierarchy
`main.jsx` renders `App.jsx`. `App` holds the main task state and chooses which view to display. It uses `Sidebar` for navigation and `Header` for search and the add-task button. `StatCard` and `TaskItem` are reusable child components. `AddTaskForm` manages controlled input fields and sends a new task back to `App` through a callback prop.

## Data and state
The task array is stored in `App`. New tasks are added with a state update, completion toggles a task's `completed` property, and deletion filters the task out of the array. The search input is controlled by `search` state and filters tasks shown in the current view.

## AI assistance disclosure
AI assistance was used to help draft and organize parts of the React component structure, styling, and README. Review the code, make any changes needed, and ensure this disclosure accurately describes the assistance used before submitting.
