import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from '../../AppStateContext';
import { Actions, Task } from '../../AppStateTypes';
import { useDragItem } from '../../hooks/useDragItem';
import { isHidden } from '../../utils/isHidden';
import { Card } from '../Card/Card';
import { CreateItem } from '../CreateItem/CreateItem';
import { DragItem, DragTypes } from '../CustomDragLayer/DragItemTypes';

interface LaneProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
}

export const Lane = ({ text, index, id, isPreview }: LaneProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useDragItem({ type: DragTypes.LANE, id, index, text });

  const handleCreate = (text: string) => {
    dispatch({ type: Actions.ADD_TASK, payload: { text, listId: id } });
  };

  const [, drop] = useDrop({
    accept: [DragTypes.LANE, DragTypes.CARD],
    hover(item: DragItem) {
      if (item.type === DragTypes.LANE) {
        const dragIndex = item.index;
        const hoverIndex = id;

        if (dragIndex === +hoverIndex) {
          return;
        }

        dispatch({
          type: Actions.MOVE_LIST,
          payload: { draggedIdx: dragIndex, hoverIdx: +hoverIndex },
        });
        item.index = +hoverIndex;
      } else {
        const dragIndex = item.index;
        const hoverIndex = 0;
        const sourceLane = item.laneId;
        const targetLane = id;

        if (sourceLane === targetLane) {
          return;
        }

        dispatch({
          type: Actions.MOVE_TASK,
          payload: { dragIndex, hoverIndex, sourceLane, targetLane },
        });

        item.index = hoverIndex;
        item.laneId = targetLane;
      }
    },
  });

  drag(drop(ref));

  console.log(state.lists);

  return (
    <section
      ref={ref}
      className={` bg-slate-200 shadow-sm mr-4 rounded-md h-min p-4 flex-grow-0 w-max-[300px]
      ${isPreview ? 'rotate-6' : 'rotate-0'}
      ${
        isHidden(isPreview, state.draggedItem, DragTypes.LANE, id)
          ? 'opacity-0'
          : 'opacity-100'
      }
      `}
    >
      <h2 className="font-bold pb-4">{text}</h2>

      {state.lists &&
        state.lists[index]?.tasks
          ?.filter((task) => Boolean(task))
          .map((task: Task, i: number) => {
            console.log(index, task);
            return (
              <Card
                id={task.id}
                laneId={id}
                text={task.text}
                key={task.id}
                index={i}
              />
            );
          })}
      <CreateItem toggleButtonText="+ New item" onCreate={handleCreate} dark />
    </section>
  );
};
