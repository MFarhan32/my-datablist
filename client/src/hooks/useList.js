import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listService } from '../services/listService';

export const useLists = () => {
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ['lists'], queryFn: listService.getAll });
  const createList = useMutation({
    mutationFn: listService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lists'] }),
  });

  return { ...query, createList };
};
