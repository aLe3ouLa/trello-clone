import { useState } from 'react';
import { CreateItemForm } from '../CreateItemForm/CreateItemForm';

interface CreateItemProps {
  onCreate(text: string): void;
  toggleButtonText?: string;
  dark?: boolean;
}

export const CreateItem = ({
  onCreate,
  toggleButtonText,
  dark,
}: CreateItemProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  if (showForm) {
    return (
      <CreateItemForm
        onCreate={(text) => {
          onCreate(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <button
      className={`bg-slate-200/25 rounded-sm border-none pt-2 pb-2 pr-3 pl-3  ${
        dark ? 'text-black' : 'text-white'
      } cursor-pointer  transition-colors w-full hover:bg-slate-200/50`}
      style={{ minWidth: '300px' }}
      onClick={() => setShowForm(true)}
    >
      {toggleButtonText}
    </button>
  );
};
