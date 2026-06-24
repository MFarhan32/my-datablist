import { createContext, useContext, useState } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [activeListId, setActiveListId] = useState(null);
  return <DataContext.Provider value={{ activeListId, setActiveListId }}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
