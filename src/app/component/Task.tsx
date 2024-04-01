import { MouseEventHandler } from "react";
import Timer from "./Timer";

interface Props {
  className: string;
  title: string;
  group: string;
  onClick: MouseEventHandler;
  handleDelete: any;
}
export default function Task({
  className,
  title,
  group,
  onClick,
  handleDelete,
}: Props) {
  return (
    <div
      className={`${className} relative flex justify-between group`}
      onClick={onClick}
    >
      <button
        onClick={handleDelete}
        className="h-full absolute top-0 left-0 bg-red-500 group-hover:opacity-70 opacity-0"
      >
        Delete
      </button>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <span>{group}</span>
      </div>
      <div className="flex items-center justify-center gap-1">
        <Timer taskTitle={title} taskGroup={group} />
      </div>
    </div>
  );
}
