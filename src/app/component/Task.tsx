import { MouseEventHandler } from "react";
import Timer from "./Timer";
import Button from "./Button";
import Image from "next/image";
import trashCanIcon from "../../assets/trash-can-with-cover-svgrepo-com.svg";
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
      className={`${className} relative flex justify-between group overflow-hidden`}
      onClick={onClick}
    >
      <Button
        onClick={handleDelete}
        className="h-full flex justify-center items-center absolute top-0 left-0 -translate-x-5 opacity-0 transition-all group-hover:-translate-x-0 group-hover:opacity-70"
        type={"button"}
      >
        <Image
          src={trashCanIcon}
          alt={"delete button icon"}
          className="w-1/2 h-1/2"
        />
      </Button>
      <div className="ml-5">
        <h2 className="text-xl font-bold">{title}</h2>
        <span>{group}</span>
      </div>
      <div className="flex items-center justify-center gap-1">
        <Timer taskTitle={title} taskGroup={group} />
      </div>
    </div>
  );
}
