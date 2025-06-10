import React, { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Image, Video, FileText, Folder, File, ArrowLeft
} from 'lucide-react';
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import useFileExplorerStore from '../stores/fileExplorerStore'; 

export const Route = createFileRoute('/files')({
  component: FileExplorerPage,
});


const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: true
  });
};

const fetchFiles = async (path) => {
  const apiUrl = `https://nas.campuscatalyst.info/api/v1/files/?path=${path}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.files;
};

function FileExplorerPage() {

  const currentPath = useFileExplorerStore((state) => state.currentPath);
  const goToDirectory = useFileExplorerStore((state) => state.goToDirectory);
  const goUpDirectory = useFileExplorerStore((state) => state.goUpDirectory);

  const { data: files, isLoading, isError, error } = useQuery({
    queryKey: ['allFiles', currentPath], 
    queryFn: () => fetchFiles(currentPath), 
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });

 
  const { directories, regularFiles } = useMemo(() => {
    if (isLoading || isError || !files) {
      return { directories: [], regularFiles: [] };
    }

    const directories = [];
    const regularFiles = [];

    files.forEach(file => {
      if (file.is_directory) {
        directories.push(file);
      } else {
        regularFiles.push(file);
      }
    });

    directories.sort((a, b) => a.name.localeCompare(b.name));
    regularFiles.sort((a, b) => a.name.localeCompare(b.name));

    return { directories, regularFiles };
  }, [files, isLoading, isError]);

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg': case 'jpeg': case 'png': case 'gif': case 'webp':
        return <Image className="w-5 h-5 text-blue-500" />;
      case 'mp4': case 'mkv': case 'avi': case 'mov': case 'webm':
        return <Video className="w-5 h-5 text-green-500" />;
      case 'pdf': case 'doc': case 'docx': case 'txt': case 'zip':
        return <FileText className="w-5 h-5 text-purple-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleDirectoryClick = (dirName) => {
    goToDirectory(dirName); 
  };

  const handleGoUp = () => {
    goUpDirectory(); 
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Header />
        </header>

        <div className="flex-1 flex flex-col gap-4 p-4 pt-0 overflow-y-auto">
          {isLoading ? (
            <div className="text-center text-foreground">Loading files...</div>
          ) : isError ? (
            <div className="text-center text-destructive">Error: {error.message}</div>
          ) : (
            <>

              <div className="flex items-center mb-4 text-foreground">
                <h2 className="text-2xl font-semibold mr-4">File Explorer</h2>
                <span className="text-lg text-muted-foreground">{currentPath}</span>
                {currentPath !== '/' && (
                  <button
                    onClick={handleGoUp}
                    className="ml-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Go Up
                  </button>
                )}
              </div>

              {/* Directories Section as a List */}
              {directories.length > 0 && (
                <div className="mb-8 p-2 rounded-lg bg-card shadow-sm">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Directories</h3>
                  <div className="divide-y divide-border">
                    {directories.map(dir => (
                      <div
                        key={dir.id}
                        className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleDirectoryClick(dir.name)} 
                      >
                        <Folder className="w-5 h-5 text-yellow-600 mr-3" />
                        <span className="font-medium text-foreground text-base truncate">{dir.name}</span>
                        <span className="ml-auto text-sm text-muted-foreground">{formatDate(dir.modified_at)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files Section as a List */}
              {regularFiles.length > 0 && (
                <div className="mb-8 p-2 rounded-lg bg-card shadow-sm">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Files</h3>
                  <div className="divide-y divide-border">
                    {regularFiles.map(file => (
                      <div key={file.id} className="flex items-center p-3 hover:bg-muted/50 transition-colors">
                        {getFileIcon(file.name)}
                        <span className="font-medium text-foreground text-base truncate ml-3">{file.name}</span>
                        <span className="text-sm text-muted-foreground">{formatDate(file.modified_at)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {directories.length === 0 && regularFiles.length === 0 && !isLoading && !isError && (
                <div className="text-center text-muted-foreground">
                  No files or directories found in this location.
                </div>
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
