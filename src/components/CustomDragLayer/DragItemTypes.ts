export enum DragTypes {
  LANE = 'LANE',
  CARD = 'CARD',
}

export type LaneDragItem = {
  index: number;
  id: string;
  text: string;
  type: DragTypes.LANE;
};

export type CardDragItem = {
  index: number;
  id: string;
  laneId: string;
  text: string;
  type: DragTypes.CARD;
};

export type DragItem = LaneDragItem | CardDragItem;
