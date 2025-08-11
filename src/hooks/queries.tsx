import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  type CreateTaskData,
  type Task,
  type UpdateTaskData,
} from "../services/mock-api";

export function useTasksQuery() {
  return useQuery({ queryKey: ["tasks"], queryFn: getTasks });
}

export function useTaskQuery(taskId?: string) {
  // Fetch all tasks and filter, rather than managing a separate cache for individual tasks
  const tasksQuery = useTasksQuery();
  const task = useMemo(() => tasksQuery.data?.find((task) => task.id === taskId), [tasksQuery.data, taskId]);

  return { ...tasksQuery, data: task };
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) => createTask(data),

    onSuccess: (data) => {
      // Update cache with response data to avoid refreshing
      queryClient.setQueryData<Task[]>(["tasks"], (oldQueryData) => {
        if (oldQueryData) {
          return [...oldQueryData, data];
        } else {
          return [data];
        }
      });
    },
  });
}

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
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
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData(["tasks"]);

      // Optimistically update cache with new data
      queryClient.setQueryData<Task[]>(["tasks"], (oldQueryData) => {
        return oldQueryData?.filter((task) => task.id !== id);
      });

      // Return previous state to rollback after errors
      return { previousTasks };
    },

    onError: (_error, _variables, context) => {
      // Rollback optimistic update on error
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },

    onSuccess: (_data, id) => {
      // Update cache with response data to avoid refreshing
      queryClient.setQueryData<Task[]>(["tasks"], (oldQueryData) => {
        return oldQueryData?.filter((task) => task.id !== id);
      });
    },
  });
}
