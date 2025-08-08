import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { getTasks } from "../services/mock-api";

function Home() {
  const query = useQuery({ queryKey: ["tasks"], queryFn: getTasks });

  return query.isLoading ? (
    "Loading"
  ) : (
    <ul className="max-w-2xl flex flex-col gap-2">
      {query.data?.map((task) => (
        <li className="border border-black rounded-lg" key={task.id}>
          <NavLink to={`/task/${task.id}`}>{task.description}</NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Home;
