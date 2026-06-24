import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';
import { Footer } from '../components/Layout/Footer';
import { Button } from '../components/Common/Button';
import { Loading } from '../components/Common/Loading';
import { NewListModal } from '../components/Modal/NewListModal';
import { useLists } from '../hooks/useList';

const Dashboard = () => {
  const { data: lists = [], isLoading, createList } = useLists();
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = async (payload) => {
    await createList.mutateAsync(payload);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-6xl">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">My Lists</h1>
            <Button onClick={() => setIsOpen(true)}>New List</Button>
          </div>
          {isLoading ? <Loading /> : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lists.map((list) => (
                <Link key={list._id} className="rounded border bg-white p-4" to={`/spreadsheet/${list._id}`}>
                  <h2 className="font-medium">{list.title}</h2>
                  <p className="text-sm text-slate-600">{list.description}</p>
                  <p className="mt-2 text-xs text-slate-500">{list.recordCount} records</p>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
      <NewListModal isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={handleCreate} />
    </div>
  );
};

export default Dashboard;
