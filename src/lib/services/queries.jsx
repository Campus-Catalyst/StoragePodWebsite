import { useQuery } from '@tanstack/react-query'; 
import { useMutation , useQueryClient} from '@tanstack/react-query';
import { getFileExplorerData} from './api';

export const useFileExplorerFiles = (currentPath) => {
  return useQuery({
    queryKey: ['fileExplorerFiles', currentPath], 
    queryFn: () => getFileExplorerData(currentPath),
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false, 
  });
};
 const queryClient= useQueryClient();
 export  const deleteMutation = useMutation({
    mutationFn: deleteFileOrFolder, 
    onSuccess: () => {
      queryClient.invalidateQueries(['allFiles', currentPath]);
      console.log('Item deleted successfully! Refetching file list.');
    },
    onError: (err) => {
      console.error('Error deleting item:', err);
    },
  });