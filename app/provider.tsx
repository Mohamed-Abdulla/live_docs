"use client";
import { Loader } from "@/components/loader";
import { ClientSideSuspense, LiveblocksProvider } from "@liveblocks/react/suspense";
import { FC } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};
