import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { BarChartHorizontalBig } from "lucide-react";
import Link from "next/link";
import { UserProfile } from "../user-profile";
import Image from 'next/image';

export const MainMenu = () => {
  return (
    <div className="flex gap-2 flex-col justify-between">
      <div className="flex gap-2 flex-col justify-between">
        <Link
          href="/"
          className="items-center justify-center flex"
          title="Home"
        >
          <Image src="/aut-logo.svg" alt="Logo" width={60} height={30} />
        </Link>
      </div>
      <UserProfile />
    </div>
  );
};
