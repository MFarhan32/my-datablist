import { Button } from '../Common/Button';

export const ConfirmModal = ({ isOpen, title, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="rounded bg-white p-4">
        <h3 className="mb-4">{title}</h3>
        <div className="flex gap-2">
          <Button variant="danger" onClick={onConfirm}>Confirm</Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
