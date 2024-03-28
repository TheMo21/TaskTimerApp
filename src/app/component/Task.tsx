import { MouseEventHandler } from "react";

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
    <div className={`${className} flex justify-between`} onClick={onClick}>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <span>{group}</span>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
