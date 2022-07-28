import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from '../../AppStateContext';
import { Actions } from '../../AppStateTypes';
import { useDragItem } from '../../hooks/useDragItem';
import { CardDragItem, DragTypes } from '../CustomDragLayer/LaneDragItem';
interface CardProps {
  text: string;
  index: number;
  id: string;
  laneId: string;
}

export const Card = ({ text, id, index, laneId }: CardProps) => {
  const { dispatch } = useAppState();
  const { drag } = useDragItem({
    type: DragTypes.CARD,
    id,
    index,
    text,
    laneId,
  });
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceLane = item.laneId;
      const targetLane = laneId;

      dispatch({
        type: Actions.MOVE_TASK,
        payload: { dragIndex, hoverIndex, sourceLane, targetLane },
      });
      item.index = hoverIndex;
      item.laneId = targetLane;
    },
  });

  drag(drop(ref));

  return (
    <article
      ref={ref}
      className="bg-slate-50 cursor-pointer mb-1 p-2 max-w-100 rounded-sm shadow-black"
    >
      {text}
    </article>
  );
};
