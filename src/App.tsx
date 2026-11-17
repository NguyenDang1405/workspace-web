import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from '@/providers/query-provider';
import { BrandProvider } from '@/contexts/BrandContext';
import { router } from '@/routes';

export const App: React.FC = () => {
  return (
    <QueryProvider>
      <BrandProvider>
        <RouterProvider router={router} />
      </BrandProvider>
    </QueryProvider>
  );
};

export default App;
