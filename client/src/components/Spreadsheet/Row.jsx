import { Cell } from './Cell';

export const Row = ({ row, columns, selected, onSelect, onChange }) => (
  <tr className="border-t">
    <td className="px-2 py-1"><input type="checkbox" checked={selected} onChange={(e) => onSelect(e.target.checked)} /></td>
    {columns.map((column) => (
      <td key={column} className="px-2 py-1">
        <Cell value={row.data?.[column] || ''} onChange={(value) => onChange(column, value)} />
      </td>
    ))}
  </tr>
);
