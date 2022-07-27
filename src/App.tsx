import { useAppState } from './AppStateContext';
import { Column } from './components/Column/Column';
import { CreateItem } from './components/CreateItem/CreateItem';
import { Menu } from './components/Menu/Menu';

function App() {
  const { state, dispatch } = useAppState();

  return (
    <>
      <Menu />
      <div
        className="flex items-start bg-sky-700 p-10"
        style={{ width: '100vw', height: '100vh' }}
      >
        {state.lists.map((list, index) => {
          return (
            <Column text={list.text} key={list.id} index={index} id={list.id} />
          );
        })}

        <CreateItem
          toggleButtonText="+ Add another list"
          onCreate={(text) => dispatch({ type: 'ADD_LIST', payload: text })}
        />
      </div>
    </>
  );
}

export default App;
