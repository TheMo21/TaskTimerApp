import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface Props {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler;
  className?: string;
}
export default function Input({ id, name, type, onChange, className }: Props) {
  return (
    <>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={name}
        onChange={onChange}
        className={`w-2/3 h-10 p-1 bg-slate-50 rounded-sm ${className}`}
        required
      />
    </>
  );
}
