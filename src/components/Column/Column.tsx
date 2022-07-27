import React from "react";
import { useAppState } from "../../AppStateContext";
import { Card } from "../Card/Card";
import { CreateItem } from "../CreateItem/CreateItem";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
}

export const Column = ({ text, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState();

  const handleCreate = (text: string) => {
    dispatch({ type: "ADD_TASK", payload: { text, taskId: id } });
  };

  return (
    <section className="bg-slate-300 mr-4 rounded-sm min-h-min p-4 flex-grow-0 min-w-[300px]">
      <h2 className="pb-2 font-bold ">{text}</h2>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <CreateItem
        toggleButtonText="+ Add a card"
        onCreate={handleCreate}
        dark
      />
    </section>
  );
};
