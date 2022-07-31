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
      className={`border-none rounded-sm p-2 ${
        dark ? 'text-blue-700 bg-blue-200 ' : 'text-blue-600 bg-blue-100 '
      } cursor-pointer  transition-colors w-full hover:bg-blue-400/50`}
      style={{ minWidth: '300px' }}
      onClick={() => setShowForm(true)}
    >
      {toggleButtonText}
    </button>
  );
};
