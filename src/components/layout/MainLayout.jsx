
    import React from 'react';
    import { Outlet } from 'react-router-dom';
    import { cn } from '@/lib/utils';
    import Header from '@/components/layout/Header';

    // Main Layout structure with Header
    const MainLayout = () => {
      return (
        // Main container takes full screen width and height
        <div className={cn("min-h-screen bg-background flex flex-col")}>
          {/* Render the sticky Header */}
          <Header />

          {/* Main Content Area: Renders the current page via Outlet */}
          {/* Takes full width, container handles horizontal padding, py adds vertical padding */}
          <main className={cn("flex-1 w-full container mx-auto px-4 md:px-6 py-6 md:py-8")}>
            <Outlet /> {/* All page content goes here */}
          </main>
        </div>
      );
    };

    export default MainLayout;
  