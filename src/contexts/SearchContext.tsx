"use client";

import React, { createContext, useState, ReactNode } from "react";

export interface SearchData {
    brand: string;
    brandId: string; 
    model: string;
    modelId: number;
    year: string;
    yearId: string;
}

interface SearchContextProps {
  searchData: SearchData;
  setSearchData: React.Dispatch<React.SetStateAction<SearchData>>;
}

const initialSearchData: SearchData = {
  brand: "",
  brandId: "",
  model: "",
  modelId: 0,
  year: "",
  yearId: "",
};

export const SearchContext = createContext<SearchContextProps>({
  searchData: initialSearchData,
  setSearchData: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<SearchData>(initialSearchData);

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};
