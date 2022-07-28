import { DragItem } from '../components/CustomDragLayer/LaneDragItem';

export const isHidden = (
  isPreview: boolean | undefined,
  draggedItem: DragItem | undefined,
  itemType: string,
  id: string
): boolean => {
  return Boolean(
    !isPreview &&
      draggedItem &&
      draggedItem.type === itemType &&
      draggedItem.id === id
  );
};
