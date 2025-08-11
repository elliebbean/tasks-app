import { useNavigate, useParams } from "react-router";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";
import TaskForm from "../components/TaskForm";
import { useTaskQuery, useUpdateTaskMutation } from "../hooks/queries";
import type { CreateTaskData } from "../services/mock-api";

function EditTask() {
  const { taskId } = useParams();

  const taskQuery = useTaskQuery(taskId);
  const task = taskQuery.data;
  const navigate = useNavigate();
  const updateTaskMutation = useUpdateTaskMutation();

  const onSubmit = async (taskData: CreateTaskData) => {
    if (!task) return;
    await updateTaskMutation.mutateAsync({ id: task.id, updates: taskData });
    navigate("/");
  };

  return (
    <PageLayout title={"Edit Task"}>
      <Card>
        {task ? (
          <TaskForm
            defaultValue={task}
            onSubmit={onSubmit}
            isSubmitting={updateTaskMutation.isPending}
            isError={updateTaskMutation.isError}
          />
        ) : (
          <div>Task not found</div>
        )}
      </Card>
    </PageLayout>
  );
}

export default EditTask;
