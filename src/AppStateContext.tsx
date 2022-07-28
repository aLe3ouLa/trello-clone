import { createContext, useContext, useReducer } from 'react';

import { v4 as uuid } from 'uuid';
import { AppState, AppStateContextProps, Action } from './AppStateTypes';
import { findItemIndexById } from './utils/findItemIndexById';
import { moveItem } from './utils/moveItem';

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
  draggedItem: undefined,
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_LIST': {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: uuid(), text: action.payload, tasks: [] },
        ],
      };
    }
    case 'ADD_TASK': {
      const { taskId, text } = action.payload;

      const targetLaneIndex = findItemIndexById(state.lists, taskId);

      let newStateTasks = [...state.lists];

      newStateTasks[targetLaneIndex].tasks.push();

      return {
        ...state,
        lists: [
          ...state.lists.slice(0, targetLaneIndex),
          {
            ...state.lists[targetLaneIndex],
            tasks: state.lists[targetLaneIndex].tasks.concat({
              id: uuid(),
              text,
            }),
          },
          ...state.lists.slice(targetLaneIndex + 1),
        ],
      };
    }
    case 'MOVE_LIST': {
      const { draggedIdx, hoverIdx } = action.payload;
      state.lists = moveItem(state.lists, draggedIdx, hoverIdx);
      return { ...state };
    }
    case 'SET_DRAGGED_ITEM': {
      return { ...state, draggedItem: action.payload };
    }
    case 'MOVE_TASK': {
      const { dragIndex, hoverIndex, sourceLane, targetLane } = action.payload;

      const sourceLaneIndex = findItemIndexById(state.lists, sourceLane);
      const targetLaneIndex = findItemIndexById(state.lists, targetLane);
      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0];
      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item);

      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};
