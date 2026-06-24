export const Controls = ({ search, onSearch, page, totalPages, onPage }) => (
  <div className="flex items-center justify-between">
    <input
      className="rounded border border-slate-300 px-3 py-2"
      placeholder="Search"
      value={search}
      onChange={(e) => onSearch(e.target.value)}
    />
    <div className="space-x-2 text-sm">
      <button disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
      <span>{page}/{Math.max(totalPages, 1)}</span>
      <button disabled={page >= totalPages} onClick={() => onPage(page + 1)}>Next</button>
    </div>
  </div>
);
