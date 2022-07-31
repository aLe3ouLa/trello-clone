import React from 'react';
import ReactDOM from 'react-dom/client';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App';
import { AppStateProvider } from './context/AppStateContext';
import './index.css';
import { DndProvider } from 'react-dnd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //@ts-ignore
  <DndProvider backend={HTML5Backend}>
    {/* <React.StrictMode> */}
    <AppStateProvider>
      <App />
    </AppStateProvider>
    {/* </React.StrictMode> */}
  </DndProvider>
);
