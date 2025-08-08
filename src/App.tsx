import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Task from "./pages/Task";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-2xl ml-10 my-8">Tasks App</h1>
      <main className="flex justify-center">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="task/:taskId" element={<Task />} />
          </Routes>
        </BrowserRouter>
      </main>
    </QueryClientProvider>
  );
}

export default App;
