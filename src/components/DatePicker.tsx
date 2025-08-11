import InputField from "./InputField";

interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label: string;
  error?: string;
}

export default function DatePicker({ label, error, ...inputProps }: DatePickerProps) {
  return (
    <InputField label={label} error={error}>
      <input type="date" className="w-full text-sm outline-none" {...inputProps} />
    </InputField>
  );
}
