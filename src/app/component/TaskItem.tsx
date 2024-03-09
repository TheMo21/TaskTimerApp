import { Key, MouseEventHandler, ReactNode } from "react";

interface Props {
  className: string;
  handleComplete: MouseEventHandler;
  children: ReactNode;
}
export default function TaskItem({
  className,
  children,
  handleComplete,
}: Props) {
  return (
    <li
      className={`${className} list-none flex justify-between hover:bg-opacity-50`}
    >
      {children}
      <button onClick={handleComplete}>Done</button>
    </li>
  );
}
