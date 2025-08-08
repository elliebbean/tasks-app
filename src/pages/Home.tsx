import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import Card from "../components/Card";
import { getTasks } from "../services/mock-api";

function Home() {
  const query = useQuery({ queryKey: ["tasks"], queryFn: getTasks });

  console.log(query.data);

  return (
    <ul className="flex flex-col gap-2 w-full max-w-2xl">
      {query.data?.map((task) => (
        <Card key={task.id}>
          <div className="flex items-center">
            <input type="checkbox" checked={task.isCompleted} />
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
