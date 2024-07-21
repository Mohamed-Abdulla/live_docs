import { CollaborativeRoom } from "@/components/collaborative-room";
import { Editor } from "@/components/editor/Editor";

import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom />
      <Editor />
    </main>
  );
};

export default Page;
