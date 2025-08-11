# Tasks App

A simple task management application built in React

## Getting started

First, run `npm install`.

Then run `npm run dev` to start the dev server and go to <http://localhost:5173/> to view the app.

Alternatively, run `npm run build && npm run preview` and go to <http://localhost:4173/> to preview a prodution build.

The test suite can be run with `npm run test`.

## Notes

### `dueDate` type in `mock-api.ts`

I had to modify `mock-api.ts` slightly due to a bug with the `dueDate` - when created initially, this would be a `Date`,
but when reloaded from local storage it would be a `string`.

This change in `loadTasksFromLocalStorage`:

```typescript
return tasks.map((task) => {
  return {
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
  };
});
```

correctly transforms it into a `Date`.

### State Management

I chose to use React Query for this task instead of a state management library such as Redux, as it is designed explicitly
for managing state retrieved via an API, and handles things such as loading and error states in an intuitive way with
little boilerplate.

### Testing

I created a suite of tests for the `Home` page in `src/tests/home.test.tsx`. This reflects my preferred frontend testing
strategy of focusing on integration tests of complete pages rather than unit tests of individual components.

For a production application I would expand this testing to cover all pages, as well as unit tests of anything with especially
complex logic (in particular, the hooks in `src/hooks/queries.tsx`).

### Accessibility Considerations

All form controls have an associated label - for the unlabelled completion checkbox in the task list I added an
`aria-label` attribute instead.

The app is fully keyboard navigable, with focus styles on all interactive elements, though additional keyboard shortcuts
would be a possible improvment.

Semantic HTML and ARIA attributes have been used where appropriate - in particular, tasks in the task list are `<li>`s
with their `labelledby` and `describedby` attributes set to the corresponding elements.

### Use of AI Tools

No AI generated code is included in this task - after careful experimentation, I've found using large amounts of AI
generated code does not measurably accelerate my development. Instead, the main way I integrate AI into my workflow is
using ChatGPT as a "rubber duck" for planning and debugging.

### Potential UI/UX Improvements

I opted for a very simple UI and focused on core functionality due to the time constraints of this task. For a production
application, I would take the time to build a design with more thoughtful use of colour, spacing, fonts and iconography.

There also several other clear improvments I would make if I had more time:

- Styling the task completion checkboxes instead of using the browser default checkbox
- Using a custom confirmation dialog on deleting a task instead of `window.confirm()`
- Using a custom date picker for the due date on tasks instead of the browser default
