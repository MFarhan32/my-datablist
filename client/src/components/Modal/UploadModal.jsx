import { Button } from '../Common/Button';

export const UploadModal = ({ isOpen, onClose, onUpload }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Upload CSV</h2>
        <input type="file" accept=".csv" onChange={(e) => onUpload(e.target.files?.[0])} />
        <div className="mt-4">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};
