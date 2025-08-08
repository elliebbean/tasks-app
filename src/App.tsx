import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Task from "./pages/Task";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="task/:taskId" element={<Task />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
