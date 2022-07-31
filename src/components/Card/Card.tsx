import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from '../../AppStateContext';
import { Actions } from '../../AppStateTypes';
import { useDragItem } from '../../hooks/useDragItem';
import { isHidden } from '../../utils/isHidden';
import { CardDragItem, DragTypes } from '../CustomDragLayer/DragItemTypes';
interface CardProps {
  text: string;
  index: number;
  id: string;
  laneId: string;
  isPreview?: boolean;
}

export const Card = ({ text, id, index, laneId, isPreview }: CardProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useDragItem({
    type: DragTypes.CARD,
    id,
    index,
    text,
    laneId,
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item: CardDragItem) {
      // if (!item) return;

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
      className={`bg-slate-50 cursor-pointer mb-1 p-2 w-min-[300px] rounded-sm shadow-sm  ${
        isPreview ? 'rotate-6' : 'rotate-0'
      }
      ${
        isHidden(isPreview, state.draggedItem, DragTypes.CARD, id)
          ? 'opacity-20'
          : 'opacity-100'
      }
      `}
    >
      {text}
    </article>
  );
};
