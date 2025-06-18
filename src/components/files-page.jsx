import React, { useMemo } from 'react';
import { useMutation , useQueryClient} from '@tanstack/react-query';

import { AppSidebar } from '@/components/app-sidebar';
import {
  Image, Video, FileText, Folder, File, ArrowLeft,ChevronRight
} from 'lucide-react';
import { deleteFileOrFolder } from '../lib/services/api';
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useFileExplorerFiles,useDeleteFileOrFolderMutation} from '../lib/services/queries'; 
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";


const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: true
  });
};
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};


export function FileExplorerPage() {

  const currentPath = useFileExplorerStore((state) => state.currentPath);
  const goToDirectory = useFileExplorerStore((state) => state.goToDirectory);
  const goUpDirectory = useFileExplorerStore((state) => state.goUpDirectory);
  const setCurrentPath= useFileExplorerStore((state)=>state.setCurrentPath);
    const { data: files, isLoading, isError, error } = useFileExplorerFiles(currentPath);

 
  const allItems = useMemo(() => {
    if (isLoading || isError || !files) {
      return [];
    }
    const combined = [...files];

    combined.sort((a, b) => {
      if (a.is_directory && !b.is_directory) return -1;
      if (!a.is_directory && b.is_directory) return 1;
      return a.name.localeCompare(b.name);
    });

    return combined;
  }, [files, isLoading, isError]);

  const getFileIcon = (item) => {
    if (!item || typeof item.name !== 'string') {
        console.warn("getFileIcon received invalid item:", item);
        return <File className="w-5 h-5 text-gray-500" />; 
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
  const deleteMutation = useDeleteFileOrFolderMutation();
   const handleDeleteItem = async (itemName) => {
     const itemPath = currentPath === '/' ? `/${itemName}` : `${currentPath}/${itemName}`;
    try {
      await deleteMutation.mutateAsync(itemPath);
    } catch (err) {
      console.error("Failed to initiate delete mutation or an unexpected error occurred:", err);
    }
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
                            href="#"
                            
                            onClick={(e) => {
                                console.log('Breadcrumb Click: Setting path to absolute:', path);
                             setCurrentPath(path);
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
          <div className="ml-auto pr-4"> 
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
                
               {allItems.length > 0 && (
                
                <div className="mb-8 p-2 rounded-lg bg-card ">
                  <div className="divide-y divide-border">
                    {allItems.map(item => (
                        <ContextMenu key={item.id}>
                            <ContextMenuTrigger>
                      <div
                        key={item.id}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors 
                                    ${item.is_directory ? 'bg-blue-50 hover:bg-blue-100' : 'bg-green-50 hover:bg-green-100'}`}
                        onClick={() => item.is_directory ? handleDirectoryClick(item.name) : null}
                      >
                        {item.is_directory && <ChevronRight className="w-4 h-4 text-gray-500 mr-1" />}
                        {getFileIcon(item)}
                        <div className="flex flex-col ml-3 flex-grow  ">
                        <span className="font-medium text-foreground text-base truncate ">{item.name}</span>
                       
                        {!item.is_directory && (
                          <span className="mr-auto text-sm text-muted-foreground ">{formatBytes(item.size)}</span>
                        )}
                        </div>
                         {!item.is_directory && (
                            <span className="ml-auto text-sm text-muted-foreground">{formatDate(item.modified_at)}</span>
                        )}
                        
                      </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                          {/* Pass the item's name to the handleDeleteItem function */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                          <ContextMenuItem  onSelect={(e) => e.preventDefault()}>Delete</ContextMenuItem>
                           </AlertDialogTrigger>
                           <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>This action cannot be undone. This will permanently delete </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteItem(item.name)}>delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        </ContextMenuContent>
                      </ContextMenu>
                      
                    ))
                    }
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
