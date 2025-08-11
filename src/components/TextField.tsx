import InputField from "./InputField";

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label: string;
  error?: string;
}

export default function TextField({ label, error, ...inputProps }: TextFieldProps) {
  return (
    <InputField label={label} error={error}>
      <input type="text" className="w-full text-sm outline-none" {...inputProps} />
    </InputField>
  );
}
