import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useAppState } from '../context/AppStateContext';
import { Actions } from '../context/AppStateTypes';
import { DragItem } from '../components/CustomDragLayer/DragItemTypes';

export const useDragItem = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    item,
    begin: () =>
      dispatch({
        type: Actions.SET_DRAGGED_ITEM,
        payload: item,
      }),
    end: () => dispatch({ type: Actions.SET_DRAGGED_ITEM, payload: undefined }),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
