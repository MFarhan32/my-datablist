import { useState } from 'react';
import { Button } from '../Common/Button';
import { Input } from '../Common/Input';

export const NewListModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded bg-white p-4">
        <h2 className="mb-4 text-lg font-semibold">New List</h2>
        <div className="space-y-3">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => onCreate({ title, description })}>Create</Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
