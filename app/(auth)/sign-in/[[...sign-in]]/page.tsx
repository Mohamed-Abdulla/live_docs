import { SignIn } from "@clerk/nextjs";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <main className="auth-page">
      <SignIn />
    </main>
  );
};

export default Page;
