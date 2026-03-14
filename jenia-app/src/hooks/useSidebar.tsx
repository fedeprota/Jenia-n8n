'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface SidebarContextType {
  activeView: string;
  setActiveView: (view: string) => void;
  showChatHistory: boolean;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveViewState] = useState('/');

  const setActiveView = useCallback((view: string) => {
    setActiveViewState(view);
  }, []);

  // Chat history is hidden when on Alert page
  const showChatHistory = activeView !== '/alert';

  const value = useMemo(
    () => ({ activeView, setActiveView, showChatHistory }),
    [activeView, setActiveView, showChatHistory]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}
