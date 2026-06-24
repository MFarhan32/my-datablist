export const Cell = ({ value, onChange }) => (
  <input className="w-full border-0 bg-transparent px-2 py-1" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
);
