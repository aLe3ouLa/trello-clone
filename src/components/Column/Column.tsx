import { useAppState } from '../../AppStateContext';
import { Card } from '../Card/Card';
import { CreateItem } from '../CreateItem/CreateItem';
import { useRef } from 'react';
import { useDragItem } from '../../hooks/useDragItem';
import { useDrop } from 'react-dnd';
import { LaneDragItem } from '../DragAndDrop/LaneDragItem';
import { isHidden } from '../../utils/isHidden';
import { Actions } from '../../AppStateTypes';

interface ColumnProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
}

export const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useDragItem({ type: 'COLUMN', id, index, text });

  const handleCreate = (text: string) => {
    dispatch({ type: Actions.ADD_TASK, payload: { text, taskId: id } });
  };

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: LaneDragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch({
        type: Actions.MOVE_LIST,
        payload: { draggedIdx: dragIndex, hoverIdx: hoverIndex },
      });
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <section
      ref={ref}
      className={`bg-slate-300 mr-4 rounded-sm min-h-min p-4 flex-grow-0 min-w-[300px]
      ${isPreview ? 'rotate-6' : 'rotate-0'}
      ${
        isHidden(isPreview, state.draggedItem, 'COLUMN', id)
          ? 'opacity-0'
          : 'opacity-100'
      }
      `}
    >
      <h2 className="pb-2 font-bold ">{text}</h2>
      {state.lists[index].tasks.map((task) => (
        <Card
          text={task.text}
          key={task.id}
          index={index}
          id={task.id}
          laneId={`${index}`}
        />
      ))}
      <CreateItem
        toggleButtonText="+ Add a card"
        onCreate={handleCreate}
        dark
      />
    </section>
  );
};
