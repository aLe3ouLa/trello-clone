export const Menu = () => {
  return (
    <nav className="flex items-center justify-between sticky pt-2 pb-2 pr-2 pl-2 bg-blue-800">
      <div className="flex items-center">
        <h1 className="text-white font-bold pr-6">Trello</h1>
        <ul className="flex items-center  text-white font-bold text-xs">
          <li className="pr-4">Workspaces</li>
          <li className="pr-4">Recent</li>
          <li className="pr-4">Starred</li>
          <li className="pr-4">Templates</li>
          <button className="bg-blue-700 pt-2 pb-2 pr-3 pl-3 rounded-sm">
            Create
          </button>
        </ul>
      </div>
      <ul className="flex">
        <li className="pr-4">
          <input
            type="search"
            placeholder="Search"
            className=" bg-blue-700 p-1 pl-2"
          />
        </li>
        <li className="bg-slate-50 w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold">
          AB
        </li>
      </ul>
    </nav>
  );
};
