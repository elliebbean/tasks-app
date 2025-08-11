import { useNavigate } from "react-router";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";
import TaskForm from "../components/TaskForm";
import { useCreateTaskMutation } from "../hooks/queries";
import type { CreateTaskData } from "../services/mock-api";

function NewTask() {
  const navigate = useNavigate();

  const createTaskMutation = useCreateTaskMutation();

  const onSubmit = async (taskData: CreateTaskData) => {
    await createTaskMutation.mutateAsync(taskData);
    navigate("/");
  };

  return (
    <PageLayout title={"Create Task"}>
      <Card>
        <TaskForm
          onSubmit={onSubmit}
          isSubmitting={createTaskMutation.isPending}
          isError={createTaskMutation.isError}
        />
      </Card>
    </PageLayout>
  );
}

export default NewTask;
