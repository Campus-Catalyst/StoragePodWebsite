import { create } from 'zustand';

const useFileExplorerStore = create((set, get) => ({
  currentPath: '/', 

  setCurrentPath: (newPath) => set({ currentPath: newPath }),

  goToDirectory: (dirName) => {
    const state = get(); 
    const newPath = state.currentPath === '/' ? `/${dirName}` : `${state.currentPath}/${dirName}`;
    set({ currentPath: newPath });
  },

  goUpDirectory: () => {
    const state = get();
    if (state.currentPath === '/') return;

    const pathSegments = state.currentPath.split('/').filter(segment => segment !== '');
    if (pathSegments.length === 0) {
      set({ currentPath: '/' }); 
    } else {
      pathSegments.pop();
      const parentPath = pathSegments.length === 0 ? '/' : `/${pathSegments.join('/')}`;
      set({ currentPath: parentPath });
    }
  },
}));

export default useFileExplorerStore;
