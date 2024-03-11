import { MouseEventHandler, ReactNode } from "react";

interface Props {
  className: string;
  title: string;
  deadline: string;
  onClick: MouseEventHandler;
  children?: ReactNode;
}
export default function EventItem({
  className,
  title,
  deadline,
  onClick,
  children,
}: Props) {
  return (
    <div className={className} onClick={onClick}>
      {children}
      <h2 className="text-xl font-bold">{title}</h2>
      <span>{deadline}</span>
    </div>
  );
}
