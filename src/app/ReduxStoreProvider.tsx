"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/redux/store";

export default function ReduxStoreProvider({ children }: { children: React.ReactNode }) {
  // Use reference to the store to ensure that the same store is re-used in case of re-renders
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
