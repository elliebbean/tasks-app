import classNames from "classnames";
import { Link, type LinkProps } from "react-router";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: "text" | "solid" | "danger";
  to?: LinkProps["to"];
  onClick?: () => void;
}

export default function Button({ children, type = "button", variant = "text", to, onClick }: ButtonProps) {
  const className = classNames(
    "text-center cursor-pointer px-5 py-3 font-semibold rounded-full focus-visible:outline-blue-400 focus-visible:outline-3 focus-visible:outline-offset-2",
    { "bg-blue-400 hover:bg-blue-300": variant === "solid" },
    { "hover:bg-gray-200": variant === "text" },
    { "text-red-900 hover:bg-red-200": variant === "danger" }
  );

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  } else {
    return (
      <button type={type} className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
}
