import classNames from "classnames";
import { useCallback, useMemo } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";
import { useDeleteTaskMutation, useTasksQuery, useUpdateTaskMutation } from "../hooks/queries";

function Home() {
  const tasksQuery = useTasksQuery();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  const onCompletionCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
      updateTaskMutation.mutate({ id: taskId, updates: { isCompleted: event.target.checked } });
    },
    [updateTaskMutation]
  );

  const onDeleteButtonClick = useCallback(
    (taskId: string, title: string) => {
      if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
        deleteTaskMutation.mutate(taskId);
      }
    },
    [deleteTaskMutation]
  );

  const content = useMemo(() => {
    if (tasksQuery.isError) {
      return <p className="text-red-600 text-center font-semibold">Error loading tasks - try reloading the page</p>;
    } else if (tasksQuery.data && tasksQuery.data.length > 0) {
      return (
        <ul className="flex flex-col gap-2">
          {tasksQuery.data?.map((task) => (
            <li
              key={task.id}
              aria-labelledby={`task-${task.id}-title`}
              aria-describedby={`task-${task.id}-description`}
            >
              <Card>
                <div className="flex items-stretch gap-2">
                  <input
                    type="checkbox"
                    aria-label="Completed"
                    checked={task.isCompleted}
                    onChange={(event) => onCompletionCheckboxChange(event, task.id)}
                  />
                  <div
                    className={classNames("flex flex-col justify-center grow border-x border-gray-500 px-1", {
                      "line-through": task.isCompleted,
                    })}
                  >
                    <h2 id={`task-${task.id}-title`} className="text-lg font-semibold">
                      {task.title}
                    </h2>
                    <p id={`task-${task.id}-description`}>{task.description}</p>
                    {task.dueDate && <p className="text-sm">Due: {task.dueDate?.toLocaleDateString()}</p>}
                  </div>
                  <div className="flex flex-col">
                    <Button to={`/task/${task.id}`}>Edit</Button>
                    <Button variant="danger" onClick={() => onDeleteButtonClick(task.id, task.title)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      );
    } else if (tasksQuery.isLoading) {
      return <p className="text-center font-semibold">Loading tasks...</p>;
    } else {
      return <p className="text-center font-semibold">No tasks yet - create one to get started!</p>;
    }
  }, [onCompletionCheckboxChange, onDeleteButtonClick, tasksQuery]);

  return (
    <PageLayout title="Tasks">
      <div className="flex flex-col items-stretch gap-2">
        {content}
        <Button variant="solid" to="/new">
          New Task
        </Button>
      </div>
    </PageLayout>
  );
}

export default Home;
