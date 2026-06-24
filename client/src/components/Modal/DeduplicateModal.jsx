import { Button } from '../Common/Button';

export const DeduplicateModal = ({ isOpen, duplicates, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-2xl rounded bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Duplicate Matches ({duplicates.length})</h2>
        <div className="max-h-80 overflow-auto text-xs">
          {duplicates.map((pair, index) => <pre key={index}>{JSON.stringify(pair, null, 2)}</pre>)}
        </div>
        <Button className="mt-3" variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};
