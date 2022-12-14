import { DragItem } from '../components/CustomDragLayer/DragItemTypes';

export interface Task {
  id: string;
  text: string;
}

export interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  lists: List[];
  draggedItem: DragItem | undefined;
}

export interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export enum Actions {
  ADD_LIST = 'ADD_LIST',
  ADD_TASK = 'ADD_TASK',
  MOVE_LIST = 'MOVE_LIST',
  SET_DRAGGED_ITEM = 'SET_DRAGGED_ITEM',
  MOVE_TASK = 'MOVE_TASK',
}

export type Action =
  | {
      type: Actions.ADD_LIST;
      payload: string;
    }
  | {
      type: Actions.ADD_TASK;
      payload: { text: string; listId: string };
    }
  | {
      type: Actions.MOVE_LIST;
      payload: { draggedIdx: number; hoverIdx: number };
    }
  | {
      type: Actions.SET_DRAGGED_ITEM;
      payload: DragItem | undefined;
    }
  | {
      type: Actions.MOVE_TASK;
      payload: {
        dragIndex: number;
        hoverIndex: number;
        sourceLane: string;
        targetLane: string;
      };
    };
