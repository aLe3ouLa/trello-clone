import { useState } from "react";
import { useFocus } from "../../hooks/useFocus";

interface CreateItemFormsProps {
  onCreate(text: string): void;
}

export const CreateItemForm = ({ onCreate }: CreateItemFormsProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();


  return (
    <div className="flex flex-col	w-full items-start min-w-[300px]" >
      <input
        ref={inputRef}
        className="rounded-sm border-none shadow-black mb-1 p-2 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className=" bg-green-500 rounded-sm border-none shadow-none text-white p-3 " onClick={() => onCreate(text)}>Create</button>
    </div>
  );
};
