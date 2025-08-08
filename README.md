# Tasks App

A simple task management application built in React

## Getting started

First, run `npm install`.

Then run `npm run dev` to start the dev server and go to <http://localhost:5173/> to view the app.

Alternatively, run `npm run build && npm run preview` and go to <http://localhost:4173/> to preview a prodution build.

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
