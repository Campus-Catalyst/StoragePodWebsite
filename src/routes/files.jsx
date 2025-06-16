import React, { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { FileExplorerPage } from '@/components/files-page';


export const Route = createFileRoute('/files')({
  component: FileExplorerPage,
});





function Files() {

  return (
     <>
      <FileExplorerPage/>
     </>  
    )
}
