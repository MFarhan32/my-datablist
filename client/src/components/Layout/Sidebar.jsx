import { Link } from 'react-router-dom';

export const Sidebar = () => (
  <aside className="hidden w-56 border-r bg-white p-4 md:block">
    <div className="space-y-2 text-sm">
      <Link className="block" to="/dashboard">Lists</Link>
      <Link className="block" to="/import">CSV Import</Link>
    </div>
  </aside>
);
