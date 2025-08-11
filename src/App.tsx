import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import EditTask from "./pages/EditTask";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="task/:taskId" element={<EditTask />} />
          <Route path="new" element={<NewTask />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
