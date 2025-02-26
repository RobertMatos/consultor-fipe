"use client";

import React, { ReactNode } from "react";
import { SearchProvider } from "@/contexts/SearchContext";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <SearchProvider>{children}</SearchProvider>;
}
