// context/HistoryContext.tsx
import React, { createContext, useContext, useState } from "react";

type HistoryItem = {
  item: string;
  weight: number;
  price: number;
  types: number;
};
type HistoryContextType = {
  history: HistoryItem[];
  addHistoryItem: (item: HistoryItem) => void;
  clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addHistoryItem = (item: HistoryItem) => {
    setHistory((prev) => [...prev, item]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const editItem = (id: number, item: string) => {
    const newHistory = history.map((item) => item.price === id);
    setHistory;
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
