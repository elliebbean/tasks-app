import InputField from "./InputField";

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: string;
  error?: string;
}

export default function TextArea({ label, error, ...textAreaProps }: TextAreaProps) {
  return (
    <InputField label={label} error={error}>
      <textarea className="w-full text-sm outline-none" {...textAreaProps} />
    </InputField>
  );
}
