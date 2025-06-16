import React, { useMemo } from 'react';

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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import useFileExplorerStore from '../stores/fileExplorerStore'; 
import { useFileExplorerFiles } from '../lib/services/queries'; 


const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: true
  });
};


export function FileExplorerPage() {

  const currentPath = useFileExplorerStore((state) => state.currentPath);
  const goToDirectory = useFileExplorerStore((state) => state.goToDirectory);
  const goUpDirectory = useFileExplorerStore((state) => state.goUpDirectory);
  const setCurrentPath= useFileExplorerStore((state)=>state.currentPath);
    const { data: files, isLoading, isError, error } = useFileExplorerFiles(currentPath);

 

 
  const allItems = useMemo(() => {
    // Removed console.log('useMemo: Processing files. isLoading:', isLoading, 'isError:', isError, 'files received:', files);
    if (isLoading || isError || !files) {
      return [];
    }

    // Combine both directories and regular files into a single array
    const combined = [...files];

    // Sort by type (directories first), then alphabetically by name
    combined.sort((a, b) => {
      // Directories come before files
      if (a.is_directory && !b.is_directory) return -1;
      if (!a.is_directory && b.is_directory) return 1;
      // Then sort alphabetically by name
      return a.name.localeCompare(b.name);
    });

    // Removed console.log('useMemo Output: All Items:', combined);
    return combined;
  }, [files, isLoading, isError]);

  const getFileIcon = (item) => {
    // Ensure item and item.name are defined before attempting to split
    if (!item || typeof item.name !== 'string') {
        console.warn("getFileIcon received invalid item:", item);
        return <File className="w-5 h-5 text-gray-500" />; // Fallback icon
    }

    if (item.is_directory) {
      return <Folder className="w-5 h-5 text-yellow-600" />;
    }
    const extension = item.name.split('.').pop().toLowerCase();
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
const pathSegments = currentPath.split('/').filter(segment => segment !== '');
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
           <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/files">Root</BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => {
                  const path = '/' + pathSegments.slice(0, index + 1).join('/');
                  const isLast = index === pathSegments.length - 1;
                  return (
                    <React.Fragment key={path}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{segment}</BreadcrumbPage>
                        ) : (
                         <BreadcrumbLink
                            href="javascript:void(0)"
                            onClick={(e) => {
                             goToDirectory(path);
                            }}
                          >
                            {segment}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto pr-4"> {/* Added pr-4 for right padding */}
            {currentPath !== '/' && (
              <button
                onClick={handleGoUp}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Go Up
              </button>
            )}
          </div>
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
               {allItems.length > 0 && (
                <div className="mb-8 p-2 rounded-lg bg-card shadow-sm">
                  {/* Removed separate headings */}
                  <div className="divide-y divide-border">
                    {allItems.map(item => (
                      <div
                        key={item.id}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors
                                    ${item.is_directory ? 'bg-blue-50 hover:bg-blue-100' : 'bg-green-50 hover:bg-green-100'}`}
                        onClick={() => item.is_directory ? handleDirectoryClick(item.name) : null}
                      >
                        {getFileIcon(item)}
                        <span className="font-medium text-foreground text-base truncate ml-3">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{formatDate(item.modified_at)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {allItems.length === 0 && !isLoading && !isError && (
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
