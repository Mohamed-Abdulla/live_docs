import { SignUp } from "@clerk/nextjs";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <main className="auth-page">
      <SignUp />
    </main>
  );
};

export default Page;
