"use client";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { FC } from "react";
import { Loader } from "./loader";
import { Header } from "@/components/header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
interface CollaborativeRoomProps {}

export const CollaborativeRoom: FC<CollaborativeRoomProps> = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex w-fit items-center justify-center gap-2">
              <p className="document-title">Share</p>
            </div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Header>
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};
