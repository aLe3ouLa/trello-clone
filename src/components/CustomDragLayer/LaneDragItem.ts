export type LaneDragItem = {
  index: number;
  id: string;
  text: string;
  type: 'COLUMN';
};

export type CardDragItem = {
  index: number;
  id: string;
  laneId: string;
  text: string;
  type: 'CARD';
};

export type DragItem = LaneDragItem | CardDragItem;
