import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useAppState } from '../AppStateContext';
import { Actions } from '../AppStateTypes';
import { LaneDragItem } from '../components/DragAndDrop/LaneDragItem';

export const useDragItem = (item: LaneDragItem) => {
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