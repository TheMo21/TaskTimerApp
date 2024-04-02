import { MouseEventHandler, ReactNode } from "react";

interface Props {
  type: "submit" | "reset" | "button";
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
export default function Button({
  type,
  children,
  className,
  onClick,
  disabled = false,
}: Props) {
  return (
    <>
      <button
        type={type}
        className={`transition-transform hover:scale-105 ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
