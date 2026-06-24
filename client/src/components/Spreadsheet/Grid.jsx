import { Row } from './Row';

export const Grid = ({ records, columns, selectedIds, onToggle, onUpdate }) => (
  <div className="overflow-auto rounded border bg-white">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-slate-100 text-left">
          <th className="px-2 py-2">Select</th>
          {columns.map((column) => <th key={column} className="px-2 py-2">{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <Row
            key={record._id}
            row={record}
            columns={columns}
            selected={selectedIds.includes(record._id)}
            onSelect={(checked) => onToggle(record._id, checked)}
            onChange={(column, value) => onUpdate(record, column, value)}
          />
        ))}
      </tbody>
    </table>
  </div>
);
