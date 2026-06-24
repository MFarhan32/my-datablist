export const Toast = ({ message }) => (
  message ? <div className="fixed bottom-4 right-4 rounded bg-slate-900 px-3 py-2 text-white">{message}</div> : null
);
