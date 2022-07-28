import { LaneDragItem } from '../components/DragAndDrop/LaneDragItem';

export const isHidden = (
  isPreview: boolean | undefined,
  draggedItem: LaneDragItem | undefined,
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
