import classNames from "classnames";

interface InputFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export default function InputField({ label, error, children }: InputFieldProps) {
  const divClass = classNames(
    "w-full border border-gray-400 rounded-md px-3 py-2.5 mt-1 placeholder:text-gray-dark hover:border-black focus-within:outline-blue-500 focus-within:outline-3",
    { "border-red-400": error !== undefined },
    { "border-gray-400": error == undefined }
  );

  return (
    <div>
      <label className="text-sm">
        {label}
        <div className={divClass}>{children}</div>
      </label>
      <p className="text-red-600 text-sm h-5">{error}</p>
    </div>
  );
}
