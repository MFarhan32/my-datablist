import { useState } from 'react';
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';
import { UploadModal } from '../components/Modal/UploadModal';
import api from '../services/api';

const Import = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [listId, setListId] = useState('');

  const onUpload = async (file) => {
    if (!file || !listId) return;
    const formData = new FormData();
    formData.append('file', file);
    await api.post(`/lists/${listId}/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-6xl">
        <Sidebar />
        <main className="flex-1 p-4">
          <h1 className="text-xl font-semibold">Import CSV</h1>
          <input
            className="mt-4 rounded border border-slate-300 px-3 py-2"
            placeholder="Target list id"
            value={listId}
            onChange={(e) => setListId(e.target.value)}
          />
          <button className="ml-3 rounded bg-blue-600 px-3 py-2 text-white" onClick={() => setIsOpen(true)}>Upload CSV</button>
        </main>
      </div>
      <UploadModal isOpen={isOpen} onClose={() => setIsOpen(false)} onUpload={onUpload} />
    </div>
  );
};

export default Import;
