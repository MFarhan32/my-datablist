import { Link } from 'react-router-dom';

export const Header = () => (
  <header className="border-b bg-white">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <Link to="/dashboard" className="font-semibold">my-datablist</Link>
      <nav className="space-x-3 text-sm">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/import">Import</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  </header>
);
