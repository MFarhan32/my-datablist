export const Alert = ({ message, type = 'error' }) => (
  <div className={`rounded p-3 text-sm ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
    {message}
  </div>
);
