import { NavLink } from "react-router";
import Card from "../components/Card";
import { useTasksQuery, useUpdateTaskMutation } from "../hooks/queries";

function Home() {
  const tasksQuery = useTasksQuery();
  const updateTaskMutation = useUpdateTaskMutation();

  const handleCompletionCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
    updateTaskMutation.mutate({ id: taskId, updates: { isCompleted: event.target.checked } });
  };

  return (
    <ul className="flex flex-col gap-2 w-full max-w-2xl">
      {tasksQuery.data?.map((task) => (
        <Card key={task.id}>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={(event) => handleCompletionCheckboxChange(event, task.id)}
            />
            <div className="flex flex-col grow">
              <span>{task.title}</span>
              <span>{task.description}</span>
              {task.dueDate && <span>Due: {task.dueDate?.toLocaleDateString()}</span>}
            </div>
            <NavLink to={`/task/${task.id}`}>Edit</NavLink>
          </div>
        </Card>
      ))}
    </ul>
  );
}

export default Home;
