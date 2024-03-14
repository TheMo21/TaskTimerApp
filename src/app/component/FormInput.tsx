import { HTMLInputTypeAttribute, ReactNode } from "react";

interface Props {
  name: string;
  type: HTMLInputTypeAttribute;
  children: ReactNode;
  onChange: any;
}
export default function Input({ name, type, children, onChange }: Props) {
  return (
    <>
      <label htmlFor={name}>{children}</label>
      <input type={type} name={name} id={name} onChange={onChange} />
    </>
  );
}
