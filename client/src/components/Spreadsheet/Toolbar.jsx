import { Button } from '../Common/Button';

export const Toolbar = ({ onBulkDelete, onExport }) => (
  <div className="flex gap-2">
    <Button variant="danger" onClick={onBulkDelete}>Delete Selected</Button>
    <Button variant="secondary" onClick={() => onExport('csv')}>Export CSV</Button>
    <Button variant="secondary" onClick={() => onExport('json')}>Export JSON</Button>
  </div>
);
