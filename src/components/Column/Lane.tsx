import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from '../../AppStateContext';
import { Actions } from '../../AppStateTypes';
import { useDragItem } from '../../hooks/useDragItem';
import { isHidden } from '../../utils/isHidden';
import { Card } from '../Card/Card';
import { CreateItem } from '../CreateItem/CreateItem';
import {
  CardDragItem,
  DragTypes,
  LaneDragItem,
} from '../CustomDragLayer/LaneDragItem';

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
    dispatch({ type: Actions.ADD_TASK, payload: { text, taskId: id } });
  };

  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover(item: LaneDragItem | CardDragItem) {
      if (item.type === DragTypes.LANE) {
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

      {state.lists &&
        state.lists?.[index]?.tasks?.map((task) => (
          <Card
            text={task.text}
            key={task.id}
            index={index}
            id={task?.id}
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
