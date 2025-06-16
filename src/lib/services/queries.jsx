import { useQuery } from '@tanstack/react-query'; 
import { getFileExplorerData} from './api';

export const useFileExplorerFiles = (currentPath) => {
  return useQuery({
    queryKey: ['fileExplorerFiles', currentPath], 
    queryFn: () => getFileExplorerData(currentPath),
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false, 
  });
};