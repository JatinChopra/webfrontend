"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}
