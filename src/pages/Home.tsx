import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router";
import Card from "../components/Card";
import { getTasks, updateTask, type Task, type UpdateTaskData } from "../services/mock-api";

function Home() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["tasks"], queryFn: getTasks });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateTaskData }) => updateTask(id, updates),

    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData(["tasks"]);

      // Optimistically update cache with new data
      queryClient.setQueryData<Task[]>(["tasks"], (oldQueryData) => {
        return oldQueryData?.map((task) => {
          if (task.id === id) {
            return { ...task, ...updates };
          } else {
            return task;
          }
        });
      });

      // Return previous state to rollback after errors
      return { previousTasks };
    },

    onError: (_error, _variables, context) => {
      // Rollback optimistic update on error
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },

    onSuccess: (data, variables) => {
      // Update cache with response data to avoid refreshing
      queryClient.setQueryData<Task[]>(["tasks"], (oldQueryData) => {
        return oldQueryData?.map((task) => {
          if (task.id === variables.id) {
            return data;
          } else {
            return task;
          }
        });
      });
    },
  });

  const handleCompletionCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
    updateTaskMutation.mutate({ id: taskId, updates: { isCompleted: event.target.checked } });
  };

  return (
    <ul className="flex flex-col gap-2 w-full max-w-2xl">
      {query.data?.map((task) => (
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
