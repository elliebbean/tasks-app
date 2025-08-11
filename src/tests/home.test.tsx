import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import Home from "../pages/Home";
import { deleteTask, getTasks, updateTask, type Task } from "../services/mock-api";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithWrappers = (children: React.ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );

vi.mock("../services/mock-api.ts");

describe("Home page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("displays a message when there are no tasks", async () => {
    vi.mocked(getTasks).mockResolvedValueOnce([]);

    renderWithWrappers(<Home />);

    expect(await screen.findByText("No tasks yet - create one to get started!")).toBeInTheDocument();
  });

  it("displays an message when tasks fail to load", async () => {
    vi.mocked(getTasks).mockRejectedValueOnce(new Error());

    renderWithWrappers(<Home />);

    expect(await screen.findByText("Error loading tasks - try reloading the page")).toBeInTheDocument();
  });

  it("displays tasks and their details correctly", async () => {
    const mockTasks: Task[] = [
      {
        id: "task-1",
        title: "Setup project repository",
        description: "Initialize the project with a README and basic structure.",
        dueDate: new Date("2025-08-11"),
        isCompleted: true,
      },
      {
        id: "task-2",
        title: "Build UI components",
        description: "Create reusable components for buttons, inputs, and cards.",
        isCompleted: false,
      },
    ];

    vi.mocked(getTasks).mockResolvedValueOnce(mockTasks);

    renderWithWrappers(<Home />);

    const task1 = await screen.findByRole("listitem", { name: mockTasks[0].title });
    expect(task1).toHaveAccessibleDescription(mockTasks[0].description);
    expect(within(task1).getByText(`Due: ${mockTasks[0].dueDate?.toLocaleDateString()}`)).toBeInTheDocument();
    expect(within(task1).getByRole("checkbox", { name: "Completed" })).toBeChecked();
    expect(within(task1).getByRole("link", { name: "Edit" })).toHaveAttribute("href", `/task/${mockTasks[0].id}`);

    const task2 = screen.getByRole("listitem", { name: mockTasks[1].title });
    expect(within(task2).queryByText(/Due:/)).not.toBeInTheDocument();
    expect(within(task2).getByRole("checkbox", { name: "Completed" })).not.toBeChecked();
  });

  it("toggles completion state when clicking the checkbox", async () => {
    const mockTask: Task = {
      id: "task-1",
      title: "Setup project repository",
      isCompleted: false,
    };

    vi.mocked(getTasks).mockResolvedValueOnce([mockTask]);
    vi.mocked(updateTask).mockResolvedValueOnce({ ...mockTask, isCompleted: true });
    const user = userEvent.setup();

    renderWithWrappers(<Home />);

    const checkbox = await screen.findByRole("checkbox", { name: "Completed" });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(updateTask).toHaveBeenCalledExactlyOnceWith(mockTask.id, { isCompleted: true });
    expect(checkbox).toBeChecked();
  });

  it("deletes a task when clicking the delete button", async () => {
    const mockTask: Task = {
      id: "task-1",
      title: "Setup project repository",
      isCompleted: false,
    };

    vi.mocked(getTasks).mockResolvedValueOnce([mockTask]);
    const user = userEvent.setup();

    vi.spyOn(window, "confirm").mockReturnValue(true);

    renderWithWrappers(<Home />);

    await user.click(await screen.findByRole("button", { name: "Delete" }));

    expect(deleteTask).toHaveBeenCalledExactlyOnceWith(mockTask.id);
  });
});
