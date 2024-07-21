"use client";
import { Loader } from "@/components/loader";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { ClientSideSuspense, LiveblocksProvider } from "@liveblocks/react/suspense";
import { FC } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};
