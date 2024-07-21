import { CollaborativeRoom } from "@/components/collaborative-room";
import { Editor } from "@/components/editor/Editor";
import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { FC } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params: { id } }) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const room = await getDocument({ roomId: id, userId: clerkUser.emailAddresses[0].emailAddress });

  if (!room) redirect("/");

  //Todo: Assess the permissions of the user

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} users={[]} currentUserType={"creator"} />
      <Editor />
    </main>
  );
};

export default Page;
