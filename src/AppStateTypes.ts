import { LaneDragItem } from './components/DragAndDrop/LaneDragItem';

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
  draggedItem: LaneDragItem | undefined;
}

export interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export type Action =
  | {
      type: 'ADD_LIST';
      payload: string;
    }
  | {
      type: 'ADD_TASK';
      payload: { text: string; taskId: string };
    }
  | {
      type: 'MOVE_LIST';
      payload: { draggedIdx: number; hoverIdx: number };
    }
  | {
      type: 'SET_DRAGGED_ITEM';
      payload: LaneDragItem | undefined;
    };
