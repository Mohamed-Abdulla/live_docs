"use client";
import { Loader } from "@/components/loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { ClientSideSuspense, LiveblocksProvider } from "@liveblocks/react/suspense";
import { FC } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider: FC<ProviderProps> = ({ children }) => {
  const { user: clerkUser } = useUser();
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const users = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        });
        return users;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};
