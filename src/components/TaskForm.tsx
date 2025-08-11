import { useCallback, useState, type ChangeEventHandler, type FormEventHandler } from "react";
import type { CreateTaskData } from "../services/mock-api";
import Button from "./Button";
import DatePicker from "./DatePicker";
import TextArea from "./TextArea";
import TextField from "./TextField";

interface TaskFormProps {
  defaultValue?: Partial<CreateTaskData>;
  onSubmit: (task: CreateTaskData) => void;
  isSubmitting: boolean;
  isError: boolean;
}

const titleRequiredError = "This field is required";

export default function TaskForm({ defaultValue, onSubmit, isSubmitting, isError }: TaskFormProps) {
  const [task, setTask] = useState(defaultValue ?? {});
  const [titleError, setTitleError] = useState<string>();

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setTask((previousValue) => ({ ...previousValue, title: event.target.value }));

    if (!event.target.value) {
      setTitleError(titleRequiredError);
    } else {
      setTitleError(undefined);
    }
  }, []);

  const onChangeDescription: ChangeEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    setTask((previousValue) => ({ ...previousValue, description: event.target.value }));
  }, []);

  const onChangeDueDate: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setTask((previousValue) => ({ ...previousValue, dueDate: new Date(event.target.value) }));
  }, []);

  const onSubmitForm: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const { title, description, dueDate } = task;
      if (title === undefined) {
        setTitleError(titleRequiredError);
      } else {
        onSubmit({ title, description, dueDate });
      }
    },
    [onSubmit, task]
  );

  return (
    <form className="flex flex-col gap-1" onSubmit={onSubmitForm}>
      <TextField
        label="Title"
        value={task?.title}
        required
        error={titleError}
        onChange={onChangeTitle}
        disabled={isSubmitting}
      />
      <TextArea label="Description" value={task?.description} onChange={onChangeDescription} disabled={isSubmitting} />
      <DatePicker
        label="Due"
        value={task?.dueDate?.toISOString().slice(0, 10)}
        onChange={onChangeDueDate}
        disabled={isSubmitting}
      />
      <div className="flex justify-end gap-4">
        <Button to="/">Cancel</Button>
        <Button type="submit" variant="solid">
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </div>
      {isError && <p className="text-red-600 font-semibold">There was an error saving your task</p>}
    </form>
  );
}
