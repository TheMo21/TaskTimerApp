import { MouseEventHandler } from "react";

interface Props {
  className: string;
  title: string;
  deadline: string;
  onClick: MouseEventHandler;
}
export default function EventItem({
  className,
  title,
  deadline,
  onClick,
}: Props) {
  return (
    <div className={className} onClick={onClick}>
      <h2 className="text-xl font-bold">{title}</h2>
      <span>{deadline}</span>
    </div>
  );
}
