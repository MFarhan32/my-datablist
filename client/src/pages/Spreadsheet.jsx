import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';
import { Footer } from '../components/Layout/Footer';
import { Loading } from '../components/Common/Loading';
import { Toolbar } from '../components/Spreadsheet/Toolbar';
import { Controls } from '../components/Spreadsheet/Controls';
import { Grid } from '../components/Spreadsheet/Grid';
import { DeduplicateModal } from '../components/Modal/DeduplicateModal';
import { PAGE_SIZE } from '../utils/constants';
import { recordService } from '../services/recordService';

const Spreadsheet = () => {
  const { listId } = useParams();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [duplicates, setDuplicates] = useState([]);

  const recordsQuery = useQuery({
    queryKey: ['records', listId, page, search],
    queryFn: () => recordService.getAll(listId, { page, limit: PAGE_SIZE, search }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => recordService.update(listId, id, { data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['records', listId] }),
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: () => recordService.bulkDelete(listId, selectedIds),
    onSuccess: () => {
      setSelectedIds([]);
      queryClient.invalidateQueries({ queryKey: ['records', listId] });
    },
  });

  const payload = recordsQuery.data || { records: [], total: 0, limit: PAGE_SIZE };
  const columns = useMemo(() => Object.keys(payload.records[0]?.data || {}), [payload.records]);

  if (recordsQuery.isLoading) return <Loading />;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-6xl">
        <Sidebar />
        <main className="flex-1 space-y-4 p-4">
          <Toolbar
            onBulkDelete={() => bulkDeleteMutation.mutate()}
            onExport={async (format) => {
              const data = await recordService.getAll(listId, { format });
              console.log(data);
            }}
          />
          <Controls
            search={search}
            onSearch={setSearch}
            page={page}
            totalPages={Math.ceil((payload.total || 0) / (payload.limit || PAGE_SIZE))}
            onPage={setPage}
          />
          <Grid
            records={payload.records}
            columns={columns}
            selectedIds={selectedIds}
            onToggle={(id, checked) => setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((item) => item !== id)))}
            onUpdate={(record, column, value) => updateMutation.mutate({ id: record._id, data: { ...record.data, [column]: value } })}
          />
          <button
            className="rounded bg-slate-200 px-3 py-2"
            onClick={async () => {
              const result = await recordService.duplicates(listId, columns);
              setDuplicates(result.duplicates || []);
            }}
          >
            Detect Duplicates
          </button>
        </main>
      </div>
      <Footer />
      <DeduplicateModal isOpen={duplicates.length > 0} duplicates={duplicates} onClose={() => setDuplicates([])} />
    </div>
  );
};

export default Spreadsheet;
