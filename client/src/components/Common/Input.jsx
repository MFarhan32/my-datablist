export const Input = ({ label, error, ...props }) => (
  <label className="block text-sm">
    {label && <span className="mb-1 block text-slate-700">{label}</span>}
    <input className="w-full rounded border border-slate-300 px-3 py-2" {...props} />
    {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
  </label>
);
