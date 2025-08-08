import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getTaskById } from "../services/mock-api";

function Task() {
  const { taskId } = useParams();
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId as string),
    enabled: !!taskId,
  });

  return query.isLoading ? "Loading" : <div className="border border-gray-500">{query.data?.description}</div>;
}

export default Task;
