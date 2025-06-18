import { useQuery } from '@tanstack/react-query'; 
import { useMutation , useQueryClient} from '@tanstack/react-query';
import { getFileExplorerData,deleteFileOrFolder} from './api';

export const useFileExplorerFiles = (currentPath) => {
  return useQuery({
    queryKey: ['fileExplorerFiles', currentPath], 
    queryFn: () => getFileExplorerData(currentPath),
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false, 
  });
};
 


  export  const useDeleteFileOrFolderMutation=(currentpath)=>{
   const queryClient = useQueryClient(); 

  return useMutation({
    mutationFn: deleteFileOrFolder,
    onSuccess: () => { 
        queryClient.invalidateQueries(['fileExplorerFiles', currentpath]); 
     
    },
    onError: (err) => {
      console.error('Error deleting item:', err);
    },
  });
};